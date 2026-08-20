"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PageShell from "../../../../components/PageShell";

export default function NouveauProduitPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "", description: "", price: "", weight: "", stock: "", category: "", images: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        images: JSON.stringify(form.images ? form.images.split(",").map((s) => s.trim()) : []),
      }),
    });
    router.push("/admin/produits");
  };

  return (
    <PageShell title="Nouveau produit" description="Ajoutez un nouveau produit au catalogue Memel.">
      <form onSubmit={submit} className="space-y-6 rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
        <input required placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") })} className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
        <input required placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-[140px] w-full rounded-[1.5rem] border border-memel-brown/20 px-4 py-3" />
        <div className="grid gap-4 md:grid-cols-2">
          <input required type="number" step="0.01" placeholder="Prix" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
          <input placeholder="Poids" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input required type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
          <input placeholder="Catégorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
        </div>
        <input placeholder="Images (URL séparées par des virgules)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
        <button type="submit" className="rounded-full bg-memel-gold px-6 py-3 text-white">Enregistrer</button>
      </form>
    </PageShell>
  );
}
