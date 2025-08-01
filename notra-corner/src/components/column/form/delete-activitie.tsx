import { useDeleteActivitie } from "@/hooks/forms/delete-activitie";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface deleteActivitieProps {
  activitieId: string;
}

export function DeleteActivitie({ activitieId }: deleteActivitieProps) {
  const { mutate } = useDeleteActivitie({ activitieId });

  return (
    <div
      className="flex items-center gap-2 bg-neutral-800 w-[100px] p-1 justify-center rounded-sm hover:bg-neutral-700 cursor-pointer border-neutral-400 border shadow-md"
      onClick={() => mutate()}
    >
      <Trash size={18} />
      <h2>Excluir</h2>
    </div>
  );
}
