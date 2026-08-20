import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const order = await prisma.order.create({
    data: {
      userId: "guest",
      total: Number(data.total),
      status: "pending",
    },
  });

  return NextResponse.json(order);
}
