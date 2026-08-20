import PageShell from "../../../components/PageShell";
import { prisma } from "../../../lib/prisma";

export default async function AdminDistributeursPage() {
  const requests = await prisma.distributorRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <PageShell title="Candidatures distributeur" description="Retrouvez ici les demandes de partenariat envoyées via le formulaire distributeur.">
      <div className="space-y-6">
        {requests.length === 0 && <p className="text-sm text-memel-brown">Aucune candidature pour le moment.</p>}
        {requests.map((request) => (
          <div key={request.id} className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{request.name}</h2>
              <span className="text-sm text-memel-brown">{new Date(request.createdAt).toLocaleString("fr-FR")}</span>
            </div>
            <p className="mt-2 text-sm text-memel-brown">
              {request.email} {request.phone && `· ${request.phone}`} {request.city && `· ${request.city}`}
            </p>
            {request.message && <p className="mt-4 text-sm leading-7 text-memel-brown">{request.message}</p>}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
