"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageShell from "./PageShell";

interface ProductDetailClientProps {
  product: {
    slug: string;
    title: string;
    description: string;
    price: number;
    weight?: string | null;
    stock: number;
    category?: string | null;
  };
  images: string[];
}

export default function ProductDetailClient({ product, images }: ProductDetailClientProps) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const current = typeof window !== "undefined" ? window.localStorage.getItem("memel-cart") : null;
    const parsed = current ? JSON.parse(current) : [];
    parsed.push({ slug: product.slug, title: product.title, price: Number(product.price) });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("memel-cart", JSON.stringify(parsed));
      window.dispatchEvent(new Event("cart-updated"));
    }
    setAdded(true);
  };

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <PageShell title={product.title} description={product.description}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] border border-memel-brown/10 bg-white/90 shadow-xl">
          <img src={images[0] ?? "/prod-sample.jpg"} alt={product.title} className="h-[420px] w-full object-cover" />
        </div>
        <div className="space-y-6 rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-memel-green/10 px-3 py-1 text-sm font-medium text-memel-green">
              {product.category ?? "Produit premium"}
            </span>
            <span className="text-sm text-memel-brown">{product.stock} en stock</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-memel-green">Détails du produit</p>
            <h2 className="mt-3 text-3xl font-semibold">{product.title}</h2>
            <p className="mt-4 text-lg leading-8 text-memel-brown">{product.description}</p>
          </div>
          <div className="rounded-[1.5rem] bg-ivory p-6">
            <p className="text-sm text-memel-brown">Poids</p>
            <p className="mt-2 text-2xl font-semibold">{product.weight ?? "À définir"}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-3xl font-bold">{Number(product.price).toFixed(2)} €</span>
            <button onClick={addToCart} className="rounded-full bg-memel-gold px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              {added ? "Ajouté au panier" : "Ajouter au panier"}
            </button>
          </div>
          <Link href="/panier" className="text-sm font-semibold text-memel-gold">
            Voir le panier →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
