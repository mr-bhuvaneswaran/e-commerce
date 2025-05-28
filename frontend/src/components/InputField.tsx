import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-sm mb-1">{label}</label>
      <input ref={ref} {...props} className={`border rounded p-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
);
InputField.displayName = "InputField";

export default InputField; 