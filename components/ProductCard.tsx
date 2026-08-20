import Link from "next/link";

interface ProductCardProps {
  product: {
    slug: string;
    title: string;
    price: number;
    category?: string | null;
    description: string;
    stock: number;
    images?: string | null;
  };
}

function resolveImage(images?: string | null) {
  if (!images) return "/prod-sample.jpg";

  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) && parsed[0] ? parsed[0] : "/prod-sample.jpg";
  } catch {
    return "/prod-sample.jpg";
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = resolveImage(product.images);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-memel-brown/10 bg-white/90 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <img src={image} alt={product.title} className="h-56 w-full object-cover" />
      <div className="flex flex-1 flex-col p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-memel-green/10 px-3 py-1 text-sm font-medium text-memel-green">
            {product.category ?? "Produit premium"}
          </span>
          <span className="text-sm text-memel-brown">{product.stock} en stock</span>
        </div>
        <h2 className="text-2xl font-semibold">{product.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-7 text-memel-brown">{product.description}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-2xl font-bold">{product.price.toFixed(2)} €</span>
          <Link href={`/produits/${product.slug}`} className="rounded-full bg-memel-gold px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Voir le produit
          </Link>
        </div>
      </div>
    </article>
  );
}
