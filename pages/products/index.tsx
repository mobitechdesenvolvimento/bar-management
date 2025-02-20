import Link from "next/link";
import ProductForm from "../../components/ProductForm";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <Link
          href="/"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Go back to Home
        </Link>
        <div className="mt-8">
          <ProductForm />
        </div>
      </div>
    </div>
  );
}
