import Link from "next/link";
import PageShell from "../../../components/PageShell";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <PageShell title="Articles" description="Administration des contenus éditoriaux du blog.">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Tous les articles</h2>
        <Link href="/admin/posts/nouveau" className="rounded-full bg-memel-gold px-5 py-3 text-sm font-semibold text-white">
          Ajouter un article
        </Link>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {posts.length === 0 && <p className="text-sm text-memel-brown">Aucun article pour le moment.</p>}
        {posts.map((post) => (
          <div key={post.id} className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${post.published ? "bg-memel-green/10 text-memel-green" : "bg-memel-brown/10 text-memel-brown"}`}>
                {post.published ? "Publié" : "Brouillon"}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-memel-brown">{post.content.slice(0, 140)}…</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
