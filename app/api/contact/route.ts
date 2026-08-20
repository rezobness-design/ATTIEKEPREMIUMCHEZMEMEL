import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Nom, email et message sont requis." }, { status: 400 });
  }

  const contactMessage = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    },
  });

  return NextResponse.json(contactMessage);
}
