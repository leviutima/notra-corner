import { getColumnByUser } from "@/service/column/get-column";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { Ellipsis, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { ModalCreateActivitie } from "./modal-create-activitie";

export function Columns() {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    data: columns,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["column"],
    queryFn: async () => getColumnByUser(user.id),
    enabled: !!user?.id,
  });

  if (isLoading) return <p>Carregando colunas...</p>;

  if (error) return <p className="text-red-600">Erro ao buscar colunas.</p>;

  if (!columns || columns.length === 0) return null;

  return (
    <div className="flex gap-5">
      {columns.map((column: any) => (
        <div
          key={column.id}
          className="bg-neutral-800 w-[15vw] flex flex-col gap-2 p-3 rounded-md"
        >
          <div className="flex  justify-between">
            <h1>{column.title}</h1>
            <Ellipsis size={20} />
          </div>
          <ModalCreateActivitie />
        </div>
      ))}
    </div>
  );
}
