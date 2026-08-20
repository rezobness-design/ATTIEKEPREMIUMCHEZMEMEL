import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

interface CartItem {
  slug: string;
  title: string;
  price: number;
}

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, user: true },
  });

  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const data = await request.json();
  const items: CartItem[] = Array.isArray(data.items) ? data.items : [];

  if (!data.email || !data.name || items.length === 0) {
    return NextResponse.json({ error: "Nom, email et panier sont requis." }, { status: 400 });
  }

  const user = await prisma.user.upsert({
    where: { email: data.email },
    update: { name: data.name },
    create: { email: data.email, name: data.name },
  });

  const grouped = new Map<string, { title: string; price: number; quantity: number }>();
  for (const item of items) {
    const existing = grouped.get(item.slug);
    if (existing) {
      existing.quantity += 1;
    } else {
      grouped.set(item.slug, { title: item.title, price: Number(item.price), quantity: 1 });
    }
  }

  const total = Array.from(grouped.values()).reduce((acc, item) => acc + item.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      status: "en_attente",
      customerName: data.name,
      customerPhone: data.phone || null,
      deliveryAddress: data.address || null,
      items: {
        create: Array.from(grouped.entries()).map(([slug, item]) => ({
          productSlug: slug,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });

  for (const [slug, item] of grouped.entries()) {
    await prisma.product.updateMany({
      where: { slug },
      data: { stock: { decrement: item.quantity } },
    });
  }

  return NextResponse.json(order);
}
