import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions as any);
  if ((session as any)?.user?.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  const data = await request.json();

  if (!data.title || !data.slug || !data.content) {
    return NextResponse.json({ error: "Titre, slug et contenu sont requis." }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      category: data.category || null,
      published: Boolean(data.published),
    },
  });

  return NextResponse.json(post);
}
