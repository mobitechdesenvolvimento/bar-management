import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    { id: number; quantity: number }[]
  >([]);
  const [clientName, setClientName] = useState("");
  const [table, setTable] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Erro ao buscar produtos:", error);
    } else {
      setProducts(data || []);
    }
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !table || selectedProducts.length === 0) {
      alert("Preencha todos os campos e selecione pelo menos um produto.");
      return;
    }

    const total = selectedProducts.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const { data, error } = await supabase.from("orders").insert([
      {
        client_name: clientName,
        table,
        products: selectedProducts,
        status: "pending",
        total,
      },
    ]);

    if (error) {
      console.error("Erro ao inserir pedido:", error);
      alert("Falha ao fazer pedido. Tente novamente.");
    } else {
      console.log("Pedido inserido:", data);
      alert("Pedido realizado com sucesso!");
      setClientName("");
      setTable("");
      setSelectedProducts([]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Fazer Pedido</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome do Cliente
          </label>
          <input
            type="text"
            placeholder="Nome do Cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mesa
          </label>
          <input
            type="text"
            placeholder="Número da Mesa"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Selecionar Produtos
          </label>
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4">
              <input
                type="checkbox"
                value={product.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProducts((prev) => [
                      ...prev,
                      { id: product.id, quantity: 1 },
                    ]);
                  } else {
                    setSelectedProducts((prev) =>
                      prev.filter((item) => item.id !== product.id)
                    );
                  }
                }}
              />
              <span>
                {product.name} - R$ {product.price.toFixed(2)}
              </span>
              <input
                type="number"
                min="1"
                defaultValue="1"
                onChange={(e) =>
                  handleQuantityChange(product.id, parseInt(e.target.value))
                }
                className="w-20 p-1 border border-gray-300 rounded-lg bg-gray-700 text-white"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Fazer Pedido
        </button>
      </form>
    </div>
  );
}
