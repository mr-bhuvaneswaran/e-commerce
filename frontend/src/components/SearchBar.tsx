interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="flex-1 max-w-lg px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD814] shadow-sm placeholder-gray-500"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
} 