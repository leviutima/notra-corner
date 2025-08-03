// src/context/useChangeSearchContext.tsx
'use client'

import { getColumnByUser } from "@/service/column/get-column";
import { RootState } from "@/store/store";
import { ColumnProps } from "@/utils/interfaces";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

type ColumnSearchContextType = {
  searchTerm: string;
  filteredColumns: ColumnProps[];
  isLoading: boolean;
  error: Error | null;
  handleSearch: (term: string) => void;
  resetSearch: () => void;
};

const ColumnSearchContext = createContext<ColumnSearchContextType | undefined>(undefined);

export function ChangeSearchProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: columns = [], isLoading, error } = useQuery({
    queryKey: ["column", user?.id],
    queryFn: async () => getColumnByUser(user.id),
    enabled: !!user?.id,
  });

  console.log(columns);
  

  const filteredColumns = useMemo(() => {
    if (searchTerm.trim() === "") {
      return columns;
    }
    return columns.filter((column: ColumnProps) =>
      column.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, columns]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  return (
    <ColumnSearchContext.Provider
      value={{
        searchTerm,
        filteredColumns,
        isLoading,
        error,
        handleSearch,
        resetSearch,
      }}
    >
      {children}
    </ColumnSearchContext.Provider>
  );
}

export function useColumnSearch() {
  const context = useContext(ColumnSearchContext);
  if (context === undefined) {
    throw new Error('useColumnSearch must be used within a ChangeSearchProvider');
  }
  return context;
}