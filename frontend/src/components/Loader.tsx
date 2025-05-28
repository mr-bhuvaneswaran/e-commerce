export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8">
      <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading"></div>
      <span className="text-blue-700 font-medium">Loading...</span>
    </div>
  );
} 