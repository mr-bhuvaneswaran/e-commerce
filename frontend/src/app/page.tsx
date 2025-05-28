"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { getProducts } from "@/lib/apiService";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Product } from "../type";

export default function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getProducts({ search, page, limit })
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, page]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#232F3E] shadow flex items-center px-6 py-3 gap-4">
        <span className="text-2xl font-black text-[#FFD814] tracking-tight">E-commerce</span>
        <SearchBar value={search} onChange={(v: string) => { setSearch(v); setPage(1); }} />
      </header>
      {/* Main */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} router={router} />
              ))}
            </div>
            <Pagination page={page} setPage={setPage} total={total} limit={limit} />
          </>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-[#232F3E] text-gray-200 text-center py-4 mt-8 text-sm">
        &copy; {new Date().getFullYear()} E-commerce.
      </footer>
    </div>
  );
}
