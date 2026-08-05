import type { SearchItem } from "@/context/SearchContext";

interface Props {
  results: SearchItem[];
  onSelect: (item: SearchItem) => void;
}

function SearchDropdown({ results, onSelect }: Props) {
  if (results.length === 0) {
    return (
      <div className="absolute left-0 top-12 w-72 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-xl">
        No results found
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      {results.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="flex w-full flex-col px-4 py-3 text-left hover:bg-slate-50"
        >
          <span className="text-sm font-medium text-slate-900">
            {item.title}
          </span>
          <span className="text-xs text-slate-500">
            {item.type}
            {item.subtitle && ` • ${item.subtitle}`}
          </span>
        </button>
      ))}
    </div>
  );
}

export default SearchDropdown;