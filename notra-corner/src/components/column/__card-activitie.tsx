import { getActivitieByColumn } from "@/service/activitie/get-activitie-by-column";
import { ActivitieProps } from "@/utils/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface cardActivitieProps {
  columnId: number;
}

export function CardActivitie({ columnId }: cardActivitieProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const handleClick = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activities", columnId],
    queryFn: () => getActivitieByColumn(columnId),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div className="p-2">Carregando...</div>;
  if (error) return <div className="p-2 text-red-500">Erro ao carregar</div>;
  if (!activities || activities.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {activities.map((activitie: ActivitieProps) => (
        <Dialog key={activitie.id}>
          <DialogTrigger asChild>
            <div
              onClick={() => console.log("Abrir modal do", activitie.title)}
              className="bg-neutral-900  rounded-md p-5 flex flex-col gap-2 hover:border hover:border-white cursor-pointer transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected === activitie.id}
                  onChange={() => handleClick(activitie.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <h1>{activitie.title}</h1>
              </div>
              <div>
                <AlignLeft size={15} />
              </div>
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>{activitie.title}</DialogTitle>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
