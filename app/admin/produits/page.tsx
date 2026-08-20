import Link from "next/link";
import PageShell from "../../../components/PageShell";
import { prisma } from "../../../lib/prisma";

export default async function AdminProduitsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <PageShell title="Produits" description="Administration du catalogue produit.">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Catalogue</h2>
        <Link href="/admin/produits/nouveau" className="rounded-full bg-memel-gold px-5 py-3 text-sm font-semibold text-white">
          Ajouter un produit
        </Link>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <span className="text-sm text-memel-brown">{product.stock} en stock</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-memel-brown">{product.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-semibold">{Number(product.price).toFixed(2)} €</span>
              <Link href={`/admin/produits/${product.id}`} className="text-sm font-semibold text-memel-gold">
                Éditer →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
