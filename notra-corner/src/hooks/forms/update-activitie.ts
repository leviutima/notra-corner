import { updateActivitie } from "@/service/activitie/update-activitie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z  from "zod";

interface useUpdateActivitieProps {
  activitieId: string;
}

const useUpdateActivitieFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

type UseUpdateActivitieFormSchema = z.infer<
  typeof useUpdateActivitieFormSchema
>;
export function useUpdateActivitie({ activitieId }: useUpdateActivitieProps) {
  const queryClient = useQueryClient();
  const [hasSuccess, setHasSuccess] = useState(false);
  const updatedActivitie = useForm<UseUpdateActivitieFormSchema>({
    resolver: zodResolver(useUpdateActivitieFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UseUpdateActivitieFormSchema) =>
      updateActivitie(activitieId, data),
    mutationKey: ["activitie"],
    onSuccess: () => {
      toast.success("Sucesso ao atualizar atividade");
      setHasSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["activitie"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar atividade, tente novamente");
      setHasSuccess(false);
    },
  });

  const update = (data: UseUpdateActivitieFormSchema) => {
    mutate(data);
  };

  return { updatedActivitie, isPending, update, hasSuccess, setHasSuccess };
}
