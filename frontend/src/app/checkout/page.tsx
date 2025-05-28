"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../../components/Loader";
import ErrorBanner from "../../components/ErrorBanner";
import Image from "next/image";
import { getProductVariant, createOrder, OrderRequest } from "../../lib/apiService";
import OrderSummary from "../../components/OrderSummary";
import PaymentPopup from "../../components/PaymentPopup";
import CheckoutForm from "../../components/CheckoutForm";
import { Variant, Product, PendingOrderBody } from "../../type";
import { validateCheckout } from "../../lib/validateCheckout";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const variantId = searchParams.get("variantId");
  const quantity = Number(searchParams.get("quantity")) || 1;

  const [product, setProduct] = useState<Product | null>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [pendingBody, setPendingBody] = useState<PendingOrderBody | null>(null);

  useEffect(() => {
    if (productId && variantId) {
      setLoading(true);
      getProductVariant(productId, variantId)
        .then((data) => {
          setProduct(data);
          setVariant(data.selectedVariant);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [productId, variantId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateCheckout(form);
    setErrors(errs);
    setSubmitError("");
    if (Object.keys(errs).length > 0) return;
    // Show popup for payment status selection
    setPendingBody({
      ...form,
      productId,
      variantId,
      quantity,
    });
    setShowPopup(true);
  };

  const handlePaymentStatus = async (status: string) => {
    setShowPopup(false);
    if (!pendingBody) return;
    try {
      const data = await createOrder({ ...pendingBody, paymentStatus: status } as OrderRequest);
      if (data.orderId) {
        router.push(`/thank-you?orderId=${data.orderId}&status=${status}`);
      } else {
        setSubmitError(data.error || "Checkout failed");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Checkout failed");
    }
  };

  if (loading) return <Loader />;
  if (!product || !variant) return <ErrorBanner message="Product not found." />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-800 drop-shadow">Checkout</h1>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 border border-blue-100">
        {product && variant && (
          <>
            <div className="w-44 h-44 flex items-center justify-center mb-2 bg-gray-100 rounded">
              <Image
                src={product.image}
                alt={product.title}
                width={176}
                height={176}
                className="object-contain w-44 h-44"
              />
            </div>
            <OrderSummary 
              product={product}
              variant={variant}
              quantity={quantity}
              subtotal={(product.price * quantity) / 100}
            />
          </>
        )}
        <CheckoutForm form={form} errors={errors} onChange={handleChange} onSubmit={handleSubmit} submitError={submitError} />
        {showPopup && <PaymentPopup onSelect={handlePaymentStatus} onCancel={() => setShowPopup(false)} />}
      </div>
    </div>
  );
} 