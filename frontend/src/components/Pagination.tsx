interface PaginationProps {
  page: number;
  setPage: (p: number) => void;
  total: number;
  limit: number;
}

export default function Pagination({ page, setPage, total, limit }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-8 gap-2">
      <button
        className="px-3 py-1 rounded border bg-gray-100 text-gray-700 disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-[#FFD814] text-[#232F3E] font-bold' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border bg-gray-100 text-gray-700 disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
} 