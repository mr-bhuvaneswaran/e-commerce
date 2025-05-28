import React from "react";
import ErrorBanner from "./ErrorBanner";

interface CheckoutFormProps {
  form: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitError: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ form, errors, onChange, onSubmit, submitError }) => (
  <form className="flex flex-col gap-4" onSubmit={onSubmit}>
    <input name="fullName" placeholder="Full Name" className="border rounded p-2" value={form.fullName} onChange={onChange} />
    {errors.fullName && <div className="text-red-500 text-xs">{errors.fullName}</div>}
    <input name="email" placeholder="Email" className="border rounded p-2" value={form.email} onChange={onChange} />
    {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
    <input name="phone" placeholder="Phone Number" className="border rounded p-2" value={form.phone} onChange={onChange} />
    {errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
    <input name="address" placeholder="Address" className="border rounded p-2" value={form.address} onChange={onChange} />
    {errors.address && <div className="text-red-500 text-xs">{errors.address}</div>}
    <input name="city" placeholder="City" className="border rounded p-2" value={form.city} onChange={onChange} />
    {errors.city && <div className="text-red-500 text-xs">{errors.city}</div>}
    <input name="state" placeholder="State" className="border rounded p-2" value={form.state} onChange={onChange} />
    {errors.state && <div className="text-red-500 text-xs">{errors.state}</div>}
    <input name="zip" placeholder="Zip Code" className="border rounded p-2" value={form.zip} onChange={onChange} />
    {errors.zip && <div className="text-red-500 text-xs">{errors.zip}</div>}
    <input name="cardNumber" placeholder="Card Number (16 digits)" className="border rounded p-2" value={form.cardNumber} onChange={onChange} />
    {errors.cardNumber && <div className="text-red-500 text-xs">{errors.cardNumber}</div>}
    <input name="expiry" placeholder="Expiry (MM/YY)" className="border rounded p-2" value={form.expiry} onChange={onChange} />
    {errors.expiry && <div className="text-red-500 text-xs">{errors.expiry}</div>}
    <input name="cvv" placeholder="CVV (3 digits)" className="border rounded p-2" value={form.cvv} onChange={onChange} />
    {errors.cvv && <div className="text-red-500 text-xs">{errors.cvv}</div>}
    <button className="mt-4 bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700" type="submit">
      Place Order
    </button>
    {submitError && <ErrorBanner message={submitError} />}
  </form>
);

export default CheckoutForm; 