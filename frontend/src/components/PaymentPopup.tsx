import React from "react";

interface PaymentPopupProps {
  onSelect: (status: string) => void;
  onCancel: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ onSelect, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-4 items-center">
      <div className="font-bold text-lg mb-2">Simulate Payment Result</div>
      <div className="flex gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold" onClick={() => onSelect("success")}>Success</button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold" onClick={() => onSelect("failure")}>Failure</button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded font-semibold" onClick={() => onSelect("gateway_error")}>Gateway Error</button>
      </div>
      <button className="mt-2 text-blue-600 underline" onClick={onCancel}>Cancel</button>
    </div>
  </div>
);

export default PaymentPopup; 