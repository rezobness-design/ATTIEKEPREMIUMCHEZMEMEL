"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PageShell from "../../../../components/PageShell";

export default function NouveauArticlePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "", content: "", category: "", published: false });
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/posts");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Une erreur est survenue.");
    }
  };

  return (
    <PageShell title="Nouvel article" description="Rédigez un contenu éditorial pour le blog Chez Memel.">
      <form onSubmit={submit} className="space-y-6 rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
        <input
          required
          placeholder="Titre"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
              slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            })
          }
          className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
        />
        <input
          required
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
        />
        <input
          placeholder="Catégorie (optionnel)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
        />
        <textarea
          required
          placeholder="Contenu de l'article"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="min-h-[240px] w-full rounded-[1.5rem] border border-memel-brown/20 px-4 py-3"
        />
        <label className="flex items-center gap-3 text-sm text-memel-brown">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="h-4 w-4"
          />
          Publier immédiatement
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded-full bg-memel-gold px-6 py-3 text-white">
          Enregistrer
        </button>
      </form>
    </PageShell>
  );
}
