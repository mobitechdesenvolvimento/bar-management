import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          Welcome to Bar Management
        </h1>
        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Cadastrar produtos
          </Link>
          <Link
            href="/orders"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Gerenciar pedidos
          </Link>
          <Link
            href="/caixa"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Caixa
          </Link>
        </div>
      </div>
    </div>
  );
}
