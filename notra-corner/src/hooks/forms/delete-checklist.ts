import { deleteChecklist } from "@/service/checklist/delete-checklist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface useDeleteChecklistProps {
  checkilistId: number
}

export function useDeleteChecklist({checkilistId}: useDeleteChecklistProps) {
  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationFn: () => deleteChecklist(checkilistId),
    mutationKey: ['activitie'],
    onSuccess: () => {
      toast.success("Sucesso ao deletar checklist")
      queryClient.invalidateQueries({queryKey: ['activitie']})
    }
  })

  return{mutate, isPending}
}