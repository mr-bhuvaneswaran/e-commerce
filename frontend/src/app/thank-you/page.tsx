"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../../components/Loader";
import ErrorBanner from "../../components/ErrorBanner";
import Image from "next/image";
import { getOrder } from "../../lib/apiService";
import OrderSummary from "../../components/OrderSummary";
import CustomerInfo from "../../components/CustomerInfo";
import { Order } from "../../type";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrder(orderId)
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [orderId]);

  if (loading) return <Loader />;
  if (!order) return <ErrorBanner message="Order not found." />;

  const item = order.items[0];
  const isSuccess = status === "success";
  const isFailure = status === "failure";
  const isGateway = status === "gateway_error";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-extrabold mb-2 text-blue-800 drop-shadow">{isSuccess ? "Thank You!" : isFailure ? "Payment Failed" : "Gateway Error"}</h1>
      <div className="mb-6 text-center text-gray-700 font-mono text-lg">Order Number: <span className="font-bold">{order.orderNumber}</span></div>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 border border-blue-100">
        {item && (
          <>
            <div className="w-44 h-44 flex items-center justify-center mb-2 bg-gray-100 rounded">
              <Image
                src={item.Product.image}
                alt={item.Product.title}
                width={176}
                height={176}
                className="object-contain w-44 h-44"
              />
            </div>
            <OrderSummary 
              product={{ id: 0, title: item.Product.title, description: '', image: item.Product.image, price: item.subtotal / item.quantity, variants: [] }}
              variant={{ id: 0, color: item.Variant.color, size: item.Variant.size, inventory: 0 }}
              quantity={item.quantity}
              subtotal={item.subtotal / 100}
              showImage={false}
            />
          </>
        )}
        <CustomerInfo 
          name={order.fullName}
          email={order.email}
          phone={order.phone}
          address={order.address}
          city={order.city}
          state={order.state}
          zip={order.zip}
        />
        {isSuccess && <div className="text-green-700 font-semibold text-lg text-center bg-green-50 rounded p-2 border border-green-200 shadow">Your order has been received and a confirmation email has been sent!</div>}
        {isFailure && <div className="text-red-700 font-semibold text-lg text-center bg-red-50 rounded p-2 border border-red-200 shadow">Payment failed. Please try again or use a different payment method.</div>}
        {isGateway && <div className="text-yellow-700 font-semibold text-lg text-center bg-yellow-50 rounded p-2 border border-yellow-200 shadow">A gateway error occurred. Please try again later.</div>}
        <div className="flex gap-4 justify-center mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold" onClick={() => router.push("/")}>Continue Shopping</button>
          {isFailure && (
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded font-semibold" onClick={() => router.back()}>Redo Payment</button>
          )}
        </div>
      </div>
    </div>
  );
} 