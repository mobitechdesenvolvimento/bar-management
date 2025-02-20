import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Bar Management
        </Link>
        <div className="flex gap-4">
          <Link href="/products" className="text-white hover:text-blue-200">
            Products
          </Link>
          <Link href="/orders" className="text-white hover:text-blue-200">
            Orders
          </Link>
          <Link href="/caixa" className="text-white hover:text-blue-200">
            Caixa
          </Link>
        </div>
      </div>
    </nav>
  );
}
