import { notFound } from "next/navigation";
import PageShell from "../../../components/PageShell";
import { prisma } from "../../../lib/prisma";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <PageShell title={post.title} description={post.category ?? "Article Chez Memel"}>
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
        <p className="text-sm text-memel-brown">{new Date(post.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</p>
        <div className="mt-6 space-y-4 text-lg leading-8 text-memel-brown">
          {post.content.split("\n").filter(Boolean).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
