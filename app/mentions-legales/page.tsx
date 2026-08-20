import PageShell from "../../components/PageShell";

export default function MentionsLegalesPage() {
  return (
    <PageShell title="Mentions légales" description="Informations légales du site Attiéké Premium Chez Memel.">
      <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
        <p className="text-sm leading-8 text-memel-brown">Ce site est édité par Memel. Les contenus, images et informations présentes sur ce site sont protégés par les droits de propriété intellectuelle. Toute reproduction non autorisée est interdite.</p>
      </div>
    </PageShell>
  );
}
