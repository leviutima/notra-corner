import { patchFinishedChecklist } from "@/service/checklist/patch-finished-checklist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PatchFinishedChecklistProps {
  checklistId: number;
  finished: boolean;
}

export function usePatchFinishedTitle() {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: ({ checklistId, finished }: PatchFinishedChecklistProps) =>
      patchFinishedChecklist(checklistId, { finished }),
    mutationKey: ['activitie'],
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['activitie']})
    },
    onError: () => {
      toast.error('Erro ao finalizar checklist')
    }
  });

  return { mutate, isPending };
}
