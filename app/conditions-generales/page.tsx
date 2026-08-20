import PageShell from "../../components/PageShell";

export default function ConditionsGeneralesPage() {
  return (
    <PageShell title="Conditions générales" description="Conditions d’utilisation du site et des services Chez Memel.">
      <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
        <p className="text-sm leading-8 text-memel-brown">L’utilisation du site implique l’acceptation des présentes conditions. Chez Memel se réserve le droit de modifier ses offres et services à tout moment, sous réserve de conformité avec les lois applicables.</p>
      </div>
    </PageShell>
  );
}
