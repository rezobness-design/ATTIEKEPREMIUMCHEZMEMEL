"use client";

import { useState } from "react";

export default function DistributorForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const res = await fetch("/api/distributeur", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", city: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        required
        placeholder="Nom / Société"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60"
      />
      <input
        required
        type="email"
        placeholder="Votre email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          placeholder="Téléphone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60"
        />
        <input
          placeholder="Ville / Région"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60"
        />
      </div>
      <textarea
        placeholder="Parlez-nous de votre projet de distribution"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="min-h-[120px] w-full rounded-[1.5rem] border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60"
      />
      <button type="submit" disabled={status === "submitting"} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-memel-brown transition hover:opacity-90 disabled:opacity-60">
        {status === "submitting" ? "Envoi..." : "Envoyer ma candidature"}
      </button>
      {status === "success" && <p className="text-sm text-white">Merci, votre candidature a bien été envoyée.</p>}
      {status === "error" && <p className="text-sm text-red-200">Une erreur est survenue, veuillez réessayer.</p>}
    </form>
  );
}
