import type { SetStateAction } from "react";

interface SortActionProps {
  showPageSize: number;
  sort: "published_at" | "-published_at" | undefined;
  setShowPageSize: React.Dispatch<SetStateAction<number>>;
  setSort: React.Dispatch<
    SetStateAction<"published_at" | "-published_at" >
  >;
}
export default function SortFunction({
  setShowPageSize,
  setSort,
  showPageSize,
  sort,
}: SortActionProps) {
  return (
    <div className="w-full bg-white text-black flex justify-between items-center">
      <div>
        <h2>
          Show per page: {showPageSize-(showPageSize- 1)}-{showPageSize}
        </h2>
      </div>
      <div className="flex gap-6">
        <div className="flex gap-3 items-center">
          <h2>Show per page:</h2>
          <select
            id="pagesize"
            value={showPageSize}
            onChange={(e) => setShowPageSize(Number(e.target.value))}
            className="w-36 pl-3 py-2 rounded-full border border-slate-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex gap-3 items-center">
          <h2>Sort:</h2>
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "published_at" | "-published_at")
            }
            className="w-36 pl-3 py-2 rounded-full border border-slate-500"
          >
            <option value={"-published_at"}>Newest</option>
            <option value={"published_at"}>Earliest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
