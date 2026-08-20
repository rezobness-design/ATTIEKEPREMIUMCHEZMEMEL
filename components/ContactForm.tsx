"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
      <h3 className="text-xl font-semibold">Envoyez-nous un message</h3>
      <input
        required
        placeholder="Votre nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
      />
      <input
        required
        type="email"
        placeholder="Votre email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
      />
      <input
        placeholder="Votre téléphone (optionnel)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-full border border-memel-brown/20 px-4 py-3"
      />
      <textarea
        required
        placeholder="Votre message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="min-h-[140px] w-full rounded-[1.5rem] border border-memel-brown/20 px-4 py-3"
      />
      <button type="submit" disabled={status === "submitting"} className="rounded-full bg-memel-gold px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
        {status === "submitting" ? "Envoi..." : "Envoyer"}
      </button>
      {status === "success" && <p className="text-sm text-memel-green">Merci, votre message a bien été envoyé.</p>}
      {status === "error" && <p className="text-sm text-red-600">Une erreur est survenue, veuillez réessayer.</p>}
    </form>
  );
}
