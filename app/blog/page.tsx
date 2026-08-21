import Link from "next/link";
import PageShell from "../../components/PageShell";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageShell title="Blog" description="Actualités, patrimoine culinaire et coulisses de la marque Chez Memel.">
      <div className="grid gap-8 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex h-full flex-col rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              {post.category && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-memel-green/10 px-3 py-1 text-sm font-medium text-memel-green">
                  {post.category}
                </span>
              )}
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-memel-brown">{post.content.slice(0, 160)}…</p>
              <span className="mt-6 text-sm font-semibold text-memel-gold">Lire l’article →</span>
            </Link>
          ))
        ) : (
          <div className="rounded-[2rem] border border-dashed border-memel-brown/20 bg-white/70 p-8 text-center text-memel-brown lg:col-span-3">
            <p className="text-lg font-semibold">Aucun article publié pour le moment.</p>
            <p className="mt-2 text-sm">Revenez bientôt pour découvrir nos actualités.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
