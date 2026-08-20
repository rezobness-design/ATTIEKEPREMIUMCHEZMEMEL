import PageShell from "../../components/PageShell";
import DistributorForm from "../../components/DistributorForm";

export default function DevenirDistributeurPage() {
  return (
    <PageShell title="Devenir Distributeur" description="Rejoignez le réseau Chez Memel pour distribuer l’attiéké premium dans votre région.">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-10 shadow-xl">
          <h2 className="text-2xl font-semibold">Pourquoi rejoindre Chez Memel ?</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-memel-brown">
            <li>• Un produit premium, reconnu pour la qualité de sa préparation.</li>
            <li>• Un accompagnement commercial et logistique.</li>
            <li>• Un positionnement fort autour de la tradition et de l’innovation.</li>
          </ul>
        </div>
        <div className="rounded-[2rem] bg-memel-brown p-10 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">Demande de partenariat</h2>
          <p className="mt-4 text-sm leading-7 text-white/80">Remplissez le formulaire ci-dessous pour démarrer votre candidature.</p>
          <div className="mt-6">
            <DistributorForm />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
