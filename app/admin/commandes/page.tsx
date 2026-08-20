import PageShell from "../../../components/PageShell";
import { prisma } from "../../../lib/prisma";

export default async function AdminCommandesPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <PageShell title="Commandes" description="Suivi des commandes et du statut de paiement.">
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Commande {order.id.slice(0, 8)}</h2>
              <span className="rounded-full bg-memel-green/10 px-3 py-1 text-sm font-medium text-memel-green">{order.status}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-memel-brown">Total : {Number(order.total).toFixed(2)} €</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
