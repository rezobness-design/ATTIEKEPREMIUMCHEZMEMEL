"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageShell from "../../components/PageShell";

interface CartItem {
  slug: string;
  title: string;
  price: number;
}

export default function PanierPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("memel-cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  return (
    <PageShell title="Panier" description="Consultez et confirmez les produits ajoutés à votre panier Memel.">
      <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
        {items.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm leading-8 text-memel-brown">Votre panier est vide pour le moment.</p>
            <Link href="/nos-produits" className="inline-flex rounded-full bg-memel-gold px-6 py-3 text-sm font-semibold text-white">
              Découvrir les produits
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.slug} className="flex items-center justify-between rounded-full border border-memel-brown/10 px-5 py-4">
                  <span>{item.title}</span>
                  <span>{item.price.toFixed(2)} €</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-memel-brown/10 pt-6">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">{items.reduce((acc, item) => acc + item.price, 0).toFixed(2)} €</span>
            </div>
            <Link href="/checkout" className="inline-flex rounded-full bg-memel-gold px-6 py-3 text-sm font-semibold text-white">
              Passer au paiement
            </Link>
          </div>
        )}
      </div>
    </PageShell>
  );
}
