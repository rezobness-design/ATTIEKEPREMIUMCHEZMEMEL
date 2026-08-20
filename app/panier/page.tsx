"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageShell from "../../components/PageShell";

interface CartItem {
  slug: string;
  title: string;
  price: number;
}

function readCart(): CartItem[] {
  const stored = window.localStorage.getItem("memel-cart");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export default function PanierPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const removeOne = (slug: string) => {
    const current = readCart();
    const index = current.findIndex((item) => item.slug === slug);
    if (index !== -1) current.splice(index, 1);
    window.localStorage.setItem("memel-cart", JSON.stringify(current));
    window.dispatchEvent(new Event("cart-updated"));
    setItems(current);
  };

  const grouped = Object.values(
    items.reduce<Record<string, CartItem & { quantity: number }>>((acc, item) => {
      if (!acc[item.slug]) acc[item.slug] = { ...item, quantity: 0 };
      acc[item.slug].quantity += 1;
      return acc;
    }, {})
  );

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <PageShell title="Panier" description="Consultez et confirmez les produits ajoutés à votre panier Chez Memel.">
      <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
        {grouped.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm leading-8 text-memel-brown">Votre panier est vide pour le moment.</p>
            <Link href="/nos-produits" className="inline-flex rounded-full bg-memel-gold px-6 py-3 text-sm font-semibold text-white">
              Découvrir les produits
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="space-y-4">
              {grouped.map((item) => (
                <li key={item.slug} className="flex items-center justify-between rounded-full border border-memel-brown/10 px-5 py-4">
                  <span>
                    {item.title} {item.quantity > 1 && <span className="text-memel-brown">× {item.quantity}</span>}
                  </span>
                  <div className="flex items-center gap-4">
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    <button
                      type="button"
                      onClick={() => removeOne(item.slug)}
                      aria-label={`Retirer ${item.title} du panier`}
                      className="text-sm font-semibold text-memel-brown transition hover:text-red-600"
                    >
                      Retirer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-memel-brown/10 pt-6">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">{total.toFixed(2)} €</span>
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
