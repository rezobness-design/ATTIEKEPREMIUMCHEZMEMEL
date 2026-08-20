import PageShell from "../../components/PageShell";

const faqs = [
  { question: "Comment conserver l’attiéké ?", answer: "Conservez au frais et au sec, puis consommez dans les 24 heures après ouverture." },
  { question: "Livrez-vous à l’international ?", answer: "Oui, nous expédions vers l’Europe et l’Afrique de l’Ouest avec des partenaires logistiques fiables." },
  { question: "Puis-je devenir distributeur ?", answer: "Oui, contactez-nous via le formulaire Devenir Distributeur pour démarrer le partenariat." },
];

export default function FAQPage() {
  return (
    <PageShell title="FAQ" description="Questions fréquentes autour de l’attiéké premium et de la distribution.">
      <div className="space-y-6">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-[2rem] bg-white/90 p-8 shadow-lg">
            <summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary>
            <p className="mt-4 text-sm leading-7 text-memel-brown">{faq.answer}</p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
