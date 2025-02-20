import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

type Order = {
  id: number;
  client_name: string;
  table: string;
  products: { id: number; quantity: number }[];
};

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function OrderList() {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Pedidos</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded-lg">
            <p className="text-lg font-semibold">
              Cliente: {order.client_name}
            </p>
            <p className="text-gray-600">Mesa: {order.table}</p>
            <div className="mt-2">
              <p className="text-gray-600 font-semibold">Produtos:</p>
              <ul className="list-disc list-inside">
                {order.products.map((item) => {
                  const product = getProductDetails(item.id);
                  return (
                    <li key={item.id}>
                      {product?.name} - Quantidade: {item.quantity} - Preço: R${" "}
                      {(product?.price || 0).toFixed(2)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
