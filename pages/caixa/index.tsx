import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

type Order = {
  id: number;
  client_name: string;
  table: string;
  products: { id: number; quantity: number }[];
  status: string;
  total: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function CaixaPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("orders").select("*");
    if (error) {
      console.error("Erro ao buscar pedidos:", error);
    } else {
      setOrders(data || []);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Erro ao buscar produtos:", error);
    } else {
      setProducts(data || []);
    }
  };

  const getProductDetails = (productId: number) => {
    return products.find((product) => product.id === productId);
  };

  const calculateTotal = (order: Order) => {
    return order.products.reduce((total, item) => {
      const product = getProductDetails(item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      console.error("Erro ao atualizar status:", error);
    } else {
      fetchOrders(); // Atualiza a lista de pedidos
    }
  };

  const deleteOrder = async (orderId: number) => {
    const { error } = await supabase.from("orders").delete().eq("id", orderId);

    if (error) {
      console.error("Erro ao excluir pedido:", error);
    } else {
      fetchOrders(); // Atualiza a lista de pedidos
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Caixa</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border p-4 rounded-lg">
                <p className="text-lg font-semibold">
                  Cliente: {order.client_name}
                </p>
                <p className="text-gray-600">Mesa: {order.table}</p>
                <p className="text-gray-600">Status: {order.status}</p>
                <div className="mt-2">
                  <p className="text-gray-600 font-semibold">Produtos:</p>
                  <ul className="list-disc list-inside">
                    {order.products.map((item) => {
                      const product = getProductDetails(item.id);
                      return (
                        <li key={item.id}>
                          {product?.name} - Quantidade: {item.quantity} - Preço:
                          R$ {(product?.price || 0).toFixed(2)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <p className="text-lg font-semibold mt-2">
                  Total: R$ {calculateTotal(order).toFixed(2)}
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => updateOrderStatus(order.id, "Em andamento")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Em Andamento
                  </button>
                  <button
                    onClick={() =>
                      updateOrderStatus(order.id, "Pedido fechado")
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Fechar Comanda
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Excluir Pedido
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
