import { deleteActivitie } from "@/service/activitie/delete-activitie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface useDeleteActivitieProps {
  activitieId: string;
}

export function useDeleteActivitie({ activitieId }: useDeleteActivitieProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteActivitie(activitieId),
    mutationKey: ["activitie", activitieId],
    onSuccess: () => {
      toast.success("Sucesso ao excluir atividade");
      queryClient.invalidateQueries({ queryKey: ["activitie"] });
    },
    onError: () => {
      toast.error("Erro ao excluir atividade, tente novamente");
    },
  });

  return { mutate, isPending };
}
