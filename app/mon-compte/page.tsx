"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import PageShell from "../../components/PageShell";

export default function MonComptePage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", { email, name, redirect: false });
  };

  return (
    <PageShell title="Mon Compte" description="Connectez-vous pour suivre vos commandes et gérer votre expérience Memel.">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
          <h2 className="text-2xl font-semibold">Connexion</h2>
          <div className="mt-6 space-y-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre email" className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" className="w-full rounded-full border border-memel-brown/20 px-4 py-3" />
            <button onClick={handleLogin} className="rounded-full bg-memel-gold px-6 py-3 text-white">
              {status === "loading" ? "Connexion..." : "Se connecter"}
            </button>
          </div>
        </div>
        <div className="rounded-[2rem] bg-memel-brown p-10 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">Votre espace</h2>
          {status === "authenticated" ? (
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/80">
              <p>Bonjour {session?.user?.name || session?.user?.email}</p>
              <p>Vous êtes connecté à votre compte Memel.</p>
              <button onClick={() => signOut()} className="rounded-full border border-white/50 px-6 py-3 text-white">
                Se déconnecter
              </button>
            </div>
          ) : (
            <p className="mt-6 text-sm leading-7 text-white/80">Créez un compte ou connectez-vous pour suivre vos commandes et accéder à votre espace client.</p>
          )}
        </div>
      </div>
    </PageShell>
  );
}
