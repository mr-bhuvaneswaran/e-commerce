interface CustomerInfoProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export default function CustomerInfo({ name, email, phone, address, city, state, zip }: CustomerInfoProps) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <div><span className="font-semibold">Name:</span> {name}</div>
      <div><span className="font-semibold">Email:</span> {email}</div>
      <div><span className="font-semibold">Phone:</span> {phone}</div>
      <div><span className="font-semibold">Address:</span> {address}, {city}, {state}, {zip}</div>
    </div>
  );
} 