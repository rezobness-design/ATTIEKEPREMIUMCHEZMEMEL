import PageShell from "../../../components/PageShell";
import { prisma } from "../../../lib/prisma";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <PageShell title="Messages de contact" description="Retrouvez ici les demandes envoyées via le formulaire de contact.">
      <div className="space-y-6">
        {messages.length === 0 && <p className="text-sm text-memel-brown">Aucun message pour le moment.</p>}
        {messages.map((message) => (
          <div key={message.id} className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{message.name}</h2>
              <span className="text-sm text-memel-brown">{new Date(message.createdAt).toLocaleString("fr-FR")}</span>
            </div>
            <p className="mt-2 text-sm text-memel-brown">
              {message.email} {message.phone && `· ${message.phone}`}
            </p>
            <p className="mt-4 text-sm leading-7 text-memel-brown">{message.message}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
