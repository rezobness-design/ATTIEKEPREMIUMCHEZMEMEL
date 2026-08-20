import PageShell from "../../components/PageShell";

const histoireText = `Attiéké Premium Chez Memel incarne la rencontre entre excellence et tradition.
Fondée par Memel, fièrement Adioukrou, la marque valorise le savoir-faire des femmes ivoiriennes et célèbre le patrimoine gastronomique de la Côte d’Ivoire.`;

export default function NotreHistoirePage() {
  return (
    <PageShell title="Notre Histoire" description="Un récit de femmes, traditions et excellence ivoirienne.">
      <article className="space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
          <div className="space-y-6">
            <p className="text-lg leading-8 text-memel-brown">{histoireText}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <h2 className="text-xl font-semibold">Femmes</h2>
                <p className="mt-3 text-sm leading-7">Des femmes artisanes au cœur de chaque étape, de la préparation à l’emballage.</p>
              </div>
              <div className="rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <h2 className="text-xl font-semibold">Tradition</h2>
                <p className="mt-3 text-sm leading-7">Une recette ancestrale réinterprétée pour une expérience premium et moderne.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-[url('/histoire-hero.jpg')] bg-cover bg-center min-h-[420px] shadow-2xl" />
        </section>
        <section className="bg-white/80 rounded-[2rem] p-10 shadow-xl">
          <h2 className="text-3xl font-semibold mb-6">Timeline</h2>
          <div className="space-y-6">
            {[
              { year: "1998", label: "Origines familiales" },
              { year: "2010", label: "Transmission du savoir-faire" },
              { year: "2022", label: "Lancement d’Attiéké Premium" },
            ].map((item) => (
              <div key={item.year} className="flex items-start gap-6">
                <div className="min-w-[96px] text-lg font-semibold text-memel-gold">{item.year}</div>
                <div className="text-sm leading-7 text-memel-brown">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
