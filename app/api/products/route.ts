import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const data = await request.json();
  const product = await prisma.product.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      price: Number(data.price),
      weight: data.weight ?? null,
      stock: Number(data.stock),
      category: data.category ?? null,
      images: data.images ?? "[]",
    },
  });

  return NextResponse.json(product);
}
