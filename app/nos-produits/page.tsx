import { prisma } from "../../lib/prisma";
import PageShell from "../../components/PageShell";
import ProductCard from "../../components/ProductCard";

export default async function NosProduitsPage() {
  let products: Array<{ slug: string; title: string; price: number; category?: string | null; description: string; stock: number; images?: string | null }> = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erreur chargement catalogue:", error);
  }

  return (
    <PageShell title="Nos Produits" description="Une gamme premium inspirée par la tradition ivoirienne, préparée avec passion et transparence.">
      <div className="grid gap-8 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        ) : (
          <div className="rounded-[2rem] border border-dashed border-memel-brown/20 bg-white/70 p-8 text-center text-memel-brown lg:col-span-3">
            <p className="text-lg font-semibold">Le catalogue est en cours de mise à jour.</p>
            <p className="mt-2 text-sm">Vous pouvez toutefois continuer à découvrir la marque sur cette page.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
