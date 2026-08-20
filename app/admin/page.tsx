import Link from "next/link";
import PageShell from "../../components/PageShell";

export default function AdminPage() {
  return (
    <PageShell title="Administration" description="Gérez vos produits, contenus et commandes depuis un tableau de bord centralisé.">
      <div className="grid gap-8 lg:grid-cols-3">
        {[
          { title: "Produits", href: "/admin/produits", description: "Créer, mettre à jour et gérer votre catalogue." },
          { title: "Articles", href: "/admin/posts", description: "Publier des contenus éditoriaux pour la marque." },
          { title: "Commandes", href: "/admin/commandes", description: "Suivre les commandes et l’état des paiements." },
        ].map((item) => (
          <Link key={item.title} href={item.href} className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl transition hover:-translate-y-1">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-memel-brown">{item.description}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
