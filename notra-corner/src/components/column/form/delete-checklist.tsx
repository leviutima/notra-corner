import { useDeleteChecklist } from "@/hooks/forms/delete-checklist";
import { Trash } from "lucide-react";

interface deleteChecklistProps {
  checklistId: number
}

export function DeleteChecklist({checklistId}: deleteChecklistProps) {
  const {mutate,isPending} = useDeleteChecklist({checkilistId: checklistId})

  return(
    <div>
      <Trash size={15} onClick={() => mutate()} className="cursor-pointer"/>
    </div>
  )
}