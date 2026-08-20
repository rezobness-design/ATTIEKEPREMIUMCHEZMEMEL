import PageShell from "../../components/PageShell";

export default function ContactPage() {
  return (
    <PageShell title="Contact" description="Contactez Memel pour vos commandes, distributeurs et collaborations.">
      <div className="grid gap-10 lg:grid-cols-2">
        <section className="space-y-6 rounded-[2rem] bg-white/90 p-10 shadow-xl">
          <h2 className="text-2xl font-semibold">Renseignements</h2>
          <p className="text-sm leading-7 text-memel-brown">Notre équipe est disponible pour répondre à vos besoins, de l’achat direct aux projets de distribution.</p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Téléphone</h3>
              <p className="text-sm text-memel-brown">+225 00 00 00 00</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-memel-brown">contact@memel-attiéké.ci</p>
            </div>
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-sm text-memel-brown">+225 00 00 00 00</p>
            </div>
          </div>
        </section>
        <section className="rounded-[2rem] bg-[url('/contact-map.jpg')] bg-cover bg-center min-h-[360px] shadow-xl" />
      </div>
    </PageShell>
  );
}
