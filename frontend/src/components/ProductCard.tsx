import Image from "next/image";
import { useState, useEffect } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Variant } from "@/type";
import { Product } from "@/type";

export default function ProductCard({ product, router }: { product: Product; router: AppRouterInstance }) {
  const [selectedColor, setSelectedColor] = useState<string>(product.variants[0]?.color || "");
  const [selectedSize, setSelectedSize] = useState<string>(product.variants[0]?.size || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(product.variants[0] || null);

  useEffect(() => {
    const variant = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
    setSelectedVariant(variant || null);
  }, [selectedColor, selectedSize, product.variants]);

  const colors = Array.from(new Set(product.variants.map((v) => v.color)));
  const sizes = Array.from(new Set(product.variants.filter((v) => v.color === selectedColor).map((v) => v.size)));
  const outOfStock = !selectedVariant || selectedVariant.inventory < 1;

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col p-4 border border-gray-200 hover:shadow-2xl transition">
      <div className="flex-1 flex flex-col items-center">
        <div className="w-44 h-44 flex items-center justify-center mb-2 bg-gray-100 rounded">
          <Image
            src={product.image}
            alt={product.title}
            width={176}
            height={176}
            className="object-contain w-44 h-44"
          />
        </div>
        <div className="text-lg font-bold text-[#232F3E] mb-1 text-center line-clamp-2 min-h-[2.5em]">{product.title}</div>
        <div className="text-[#007185] font-bold text-xl mb-2">${(product.price / 100).toFixed(2)}</div>
        <div className="text-gray-600 text-sm mb-2 line-clamp-3 min-h-[3.5em]">{product.description}</div>
        <div className="w-full bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col gap-3 mb-2 shadow-sm">
          <div className="flex gap-2 items-center">
            <label className="font-medium text-xs">Color:</label>
            <select
              className="border border-blue-200 rounded-lg p-1 text-xs flex-1 focus:ring-2 focus:ring-blue-300 bg-white text-gray-900 shadow-sm"
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                setSelectedSize(product.variants.find((v) => v.color === e.target.value)?.size || "");
              }}
            >
              {colors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
            <label className="font-medium text-xs">Size:</label>
            <select
              className="border border-blue-200 rounded-lg p-1 text-xs flex-1 focus:ring-2 focus:ring-blue-300 bg-white text-gray-900 shadow-sm"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-medium text-xs">Qty:</label>
            <input
              type="number"
              min={1}
              max={selectedVariant?.inventory || 1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(Number(e.target.value), selectedVariant?.inventory || 1)))}
              className="border border-blue-200 rounded-lg p-1 w-16 text-xs focus:ring-2 focus:ring-blue-300 bg-white text-gray-900 shadow-sm"
              disabled={outOfStock}
            />
            <span className="text-xs text-gray-500">In stock: {selectedVariant?.inventory || 0}</span>
          </div>
          {outOfStock && (
            <div className="text-xs text-red-600 font-semibold mt-1">Out of stock</div>
          )}
        </div>
      </div>
      <button
        className="mt-2 bg-[#FFD814] hover:bg-[#F7CA00] text-[#232F3E] font-bold rounded-lg px-4 py-2 shadow transition disabled:bg-gray-300 disabled:text-gray-500 border border-[#FCD200] cursor-pointer"
        disabled={outOfStock || quantity < 1 || quantity > (selectedVariant?.inventory || 1)}
        onClick={() => {
          if (!selectedVariant) return;
          router.push(
            `/checkout?productId=${product.id}&variantId=${selectedVariant.id}&quantity=${quantity}`
          );
        }}
      >
        Buy Now
      </button>
    </div>
  );
} 