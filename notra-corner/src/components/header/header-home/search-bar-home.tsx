import { ChangeSearchProvider, useColumnSearch } from "@/context/useChangeSearchContext";
import { Search } from "lucide-react";

export function SearchBarHome() {
  const {searchTerm, handleSearch} = useColumnSearch()

  return (
    <div>
      <div className="border border-neutral-700 flex items-centert rounded-sm p-2 bg-neutral-900 w-[30vw]">
        <input
          type="text"
          className="w-full outline-none"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar coluna..."
        />
        <Search />
      </div>
    </div>
  );
}
