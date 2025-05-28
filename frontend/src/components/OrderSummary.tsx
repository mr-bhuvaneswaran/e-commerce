import { Product } from "@/type";
import { Variant } from "@/type";
import Image from "next/image";

interface OrderSummaryProps {
  product: Product;
  variant: Variant;
  quantity: number;
  subtotal: number;
  showImage?: boolean;
}

export default function OrderSummary({ product, variant, quantity, subtotal, showImage = false }: OrderSummaryProps) {
    const imageUrl = product && product.image && product.image.startsWith('/public')
    ? `http://localhost:4000${product.image}`
    : product?.image;

  return (
    <div className="flex flex-col gap-2">
      {showImage && (
        <Image src={imageUrl} alt={product.title} width={120} height={80} className="object-contain rounded mb-2" />
      )}
      <div className="font-semibold">{product.title}</div>
      <div className="text-gray-600">Variant: {variant.color} / Size {variant.size}</div>
      <div className="text-gray-600">Quantity: {quantity}</div>
      <div className="text-lg font-bold">Subtotal: ${subtotal.toFixed(2)}</div>
    </div>
  );
} 