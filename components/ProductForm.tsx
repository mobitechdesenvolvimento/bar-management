import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Please fill in all fields.");
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .insert([{ name, price: parseFloat(price) }]);

    if (error) {
      console.error("Error inserting product:", error);
      alert("Failed to add product. Please try again.");
    } else {
      console.log("Product inserted:", data);
      alert("Product added successfully!");
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            placeholder="Preço (ex: 10.99)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
