import type { SetStateAction } from "react"
import type React from "react"

interface PaginationProps {
  setShowPage: React.Dispatch<SetStateAction<number>>;
  paginationMeta: {
    current_page: number;
    last_page: number;
  } | undefined;
}
export default function Pagination({setShowPage,paginationMeta}:PaginationProps){
    // validate
if (!paginationMeta) return null;
  const { current_page, last_page } = paginationMeta;
  const pages = [];
  let startPage = 1;
  let endPage = last_page;
  if (last_page > 5) {
    if (current_page <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (current_page + 2 >= last_page) {
      startPage = last_page - 4;
      endPage = last_page;
    } else {
      startPage = current_page - 2;
      endPage = current_page + 2;
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return (
    <div className="flex gap-2 justify-center mt-8 text-black font-semibold">
        <button
        disabled={current_page === 1}
        onClick={() => setShowPage(1)}
        className="px-2 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-auto"
      >
        {'<<'}
      </button>
      <button
        disabled={current_page === 1}
        onClick={() => setShowPage(current_page - 1)}
        className="px-2 py-1 rounded cursor-pointer  disabled:opacity-50 disabled:cursor-auto"
      >
        {'<'}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setShowPage(page)}
          className={`px-3 py-1 rounded cursor-pointer ${page === current_page ? 'bg-orange-500 text-white' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={current_page === last_page}
        onClick={() => setShowPage(current_page + 1)}
        className="px-2 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-auto"
      >
        {'>'}
      </button>
        <button
        disabled={current_page === last_page}
        onClick={() => setShowPage(last_page)}
        className="px-2 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-auto"
      >
        {'>>'}
      </button>
    </div>
  );
}
