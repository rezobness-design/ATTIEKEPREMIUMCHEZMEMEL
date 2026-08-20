import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.email) {
    return NextResponse.json({ error: "Nom et email sont requis." }, { status: 400 });
  }

  const distributorRequest = await prisma.distributorRequest.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      city: data.city || null,
      message: data.message || null,
    },
  });

  return NextResponse.json(distributorRequest);
}
