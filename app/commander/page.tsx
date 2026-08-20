import Link from "next/link";
import PageShell from "../../components/PageShell";

export default function CommanderPage() {
  return (
    <PageShell title="Commander" description="Passez votre commande facilement pour recevoir votre attiéké premium chez vous.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
          <h2 className="text-2xl font-semibold">Étapes simples</h2>
          <ol className="mt-6 space-y-4 text-sm leading-7 text-memel-brown">
            <li>1. Choisissez votre produit dans la boutique.</li>
            <li>2. Contactez-nous pour confirmer la quantité et le lieu de livraison.</li>
            <li>3. Validez le paiement par votre mode préféré.</li>
            <li>4. Recevez votre commande rapidement et en toute sérénité.</li>
          </ol>
          <div className="mt-8">
            <Link href="/nos-produits" className="rounded-full bg-memel-gold px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Parcourir les produits
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-memel-brown/10 bg-memel-brown p-10 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">Besoin d’un accompagnement ?</h2>
          <p className="mt-4 text-sm leading-7 text-white/80">
            Notre équipe vous aide pour les commandes en gros, les cadeaux d’entreprise et les livraisons en Côte d’Ivoire.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Nous contacter
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
