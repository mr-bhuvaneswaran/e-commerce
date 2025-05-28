import { useState } from "react";

interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center justify-between gap-4 mb-4" role="alert">
      <span className="block font-medium">{message}</span>
      <button onClick={() => setShow(false)} className="text-red-700 hover:text-red-900 font-bold text-lg">&times;</button>
    </div>
  );
} 