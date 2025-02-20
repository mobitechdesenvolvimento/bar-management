import Link from "next/link";
import OrderList from "../../components/OrderList";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Pedidos</h1>
        <Link
          href="/place-order"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Fazer Novo Pedido
        </Link>
        <div className="mt-8">
          <OrderList />
        </div>
      </div>
    </div>
  );
}
