import Link from "next/link";
import OrderForm from "../../components/OrderForm";

export default function PlaceOrderPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Fazer Pedido</h1>
        <Link
          href="/orders"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Voltar para Pedidos
        </Link>
        <div className="mt-8">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
