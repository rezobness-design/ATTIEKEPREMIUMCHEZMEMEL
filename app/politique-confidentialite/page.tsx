import PageShell from "../../components/PageShell";

export default function PolitiqueConfidentialitePage() {
  return (
    <PageShell title="Politique de confidentialité" description="Comment Memel traite vos données personnelles.">
      <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
        <p className="text-sm leading-8 text-memel-brown">Les informations collectées via le site sont utilisées uniquement pour traiter les commandes, répondre aux demandes et améliorer l’expérience client. Elles ne sont jamais vendues à des tiers.</p>
      </div>
    </PageShell>
  );
}
