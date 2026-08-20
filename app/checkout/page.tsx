"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageShell from "../../components/PageShell";

interface CartItem {
  slug: string;
  title: string;
  price: number;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [orderId, setOrderId] = useState<string | null>(null);

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

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, items }),
    });

    if (res.ok) {
      const order = await res.json();
      setOrderId(order.id);
      setStatus("success");
      window.localStorage.removeItem("memel-cart");
      window.dispatchEvent(new Event("cart-updated"));
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <PageShell title="Checkout" description="Finalisez votre commande Chez Memel en quelques étapes.">
        <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 text-center shadow-xl">
          <h2 className="text-2xl font-semibold">Merci, votre commande est enregistrée !</h2>
          <p className="mt-4 text-sm leading-7 text-memel-brown">
            Référence commande : <span className="font-semibold">{orderId?.slice(0, 8)}</span>. Notre équipe vous contactera rapidement pour confirmer la livraison et le règlement (Mobile Money, virement ou paiement à la livraison).
          </p>
          <Link href="/nos-produits" className="mt-8 inline-flex rounded-full bg-memel-gold px-6 py-3 text-sm font-semibold text-white">
            Continuer mes achats
          </Link>
        </div>
      </PageShell>
    );
  }

  if (items.length === 0) {
    return (
      <PageShell title="Checkout" description="Finalisez votre commande Chez Memel en quelques étapes.">
        <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 text-center shadow-xl">
          <p className="text-sm leading-7 text-memel-brown">Votre panier est vide.</p>
          <Link href="/nos-produits" className="mt-6 inline-flex rounded-full bg-memel-gold px-6 py-3 text-sm font-semibold text-white">
            Découvrir les produits
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Checkout" description="Finalisez votre commande Chez Memel en quelques étapes.">
      <form onSubmit={submitOrder} className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6 rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
          <h2 className="text-2xl font-semibold">Résumé</h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={`${item.slug}-${index}`} className="flex items-center justify-between border-b border-memel-brown/10 pb-3">
                <span>{item.title}</span>
                <span>{item.price.toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-semibold">Vos coordonnées</h2>
          <div className="space-y-4">
            <input
              required
              placeholder="Nom complet"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
            />
            <input
              required
              placeholder="Téléphone (WhatsApp de préférence)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
            />
            <textarea
              required
              placeholder="Adresse de livraison"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="min-h-[100px] w-full rounded-[1.5rem] border border-memel-brown/20 px-4 py-3"
            />
          </div>
        </div>
        <div className="rounded-[2rem] bg-memel-brown p-10 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">Paiement</h2>
          <p className="mt-4 text-sm leading-7 text-white/80">Notre équipe vous contacte après validation pour convenir du paiement (Mobile Money, virement ou à la livraison).</p>
          <div className="mt-8 rounded-[1.5rem] bg-white/10 p-6">
            <p className="text-sm">Total à payer</p>
            <p className="mt-2 text-3xl font-semibold">{total.toFixed(2)} €</p>
          </div>
          <button type="submit" disabled={status === "submitting"} className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-memel-brown disabled:opacity-60">
            {status === "submitting" ? "Envoi..." : "Confirmer la commande"}
          </button>
          {status === "error" && <p className="mt-4 text-sm text-red-200">Une erreur est survenue, veuillez réessayer.</p>}
        </div>
      </form>
    </PageShell>
  );
}
