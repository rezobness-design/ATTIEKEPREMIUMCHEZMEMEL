"use client";

import { useEffect, useState } from "react";
import PageShell from "../../components/PageShell";

interface CartItem {
  slug: string;
  title: string;
  price: number;
}

export default function CheckoutPage() {
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

  const total = items.reduce((acc, item) => acc + item.price, 0);

  const submitOrder = async () => {
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, total }),
    });
    window.localStorage.removeItem("memel-cart");
    window.location.href = "/panier";
  };

  return (
    <PageShell title="Checkout" description="Finalisez votre commande Memel en quelques étapes.">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
          <h2 className="text-2xl font-semibold">Résumé</h2>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between border-b border-memel-brown/10 pb-3">
                <span>{item.title}</span>
                <span>{item.price.toFixed(2)} €</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-memel-brown p-10 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">Paiement</h2>
          <p className="mt-4 text-sm leading-7 text-white/80">Le paiement sera traité via Stripe ou Flutterwave selon votre méthode choisie.</p>
          <div className="mt-8 rounded-[1.5rem] bg-white/10 p-6">
            <p className="text-sm">Total à payer</p>
            <p className="mt-2 text-3xl font-semibold">{total.toFixed(2)} €</p>
          </div>
          <button onClick={submitOrder} className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-memel-brown">
            Confirmer la commande
          </button>
        </div>
      </div>
    </PageShell>
  );
}
