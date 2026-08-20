import PageShell from "../../../components/PageShell";
import { prisma } from "../../../lib/prisma";

export default async function AdminCommandesPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <PageShell title="Commandes" description="Suivi des commandes et du statut de paiement.">
      <div className="space-y-6">
        {orders.length === 0 && <p className="text-sm text-memel-brown">Aucune commande pour le moment.</p>}
        {orders.map((order) => (
          <div key={order.id} className="rounded-[2rem] border border-memel-brown/10 bg-white/90 p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Commande {order.id.slice(0, 8)}</h2>
              <span className="rounded-full bg-memel-green/10 px-3 py-1 text-sm font-medium text-memel-green">{order.status}</span>
            </div>
            <div className="mt-4 text-sm leading-7 text-memel-brown">
              <p>Client : {order.customerName ?? "—"}</p>
              {order.customerPhone && <p>Téléphone : {order.customerPhone}</p>}
              {order.deliveryAddress && <p>Adresse : {order.deliveryAddress}</p>}
            </div>
            <ul className="mt-4 space-y-2 border-t border-memel-brown/10 pt-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm text-memel-brown">
                  <span>
                    {item.title} {item.quantity > 1 && `× ${item.quantity}`}
                  </span>
                  <span>{(item.price * item.quantity).toFixed(2)} €</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold">Total : {Number(order.total).toFixed(2)} €</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
