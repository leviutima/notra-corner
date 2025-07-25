import { useForm } from "react-hook-form";
import { patchTitleChecklistFormSchema, PatchTitleChecklistFormSchema } from "../schemas/patch-title-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchTitleChecklist } from "@/service/checklist/patch-title-checklist";
import { toast } from "sonner";

interface usePatchTitleChecklistProps {
  checklistId: number,
}

export function usePatchTitleChecklist({checklistId}: usePatchTitleChecklistProps) {
  const queryClient = useQueryClient()
  const form = useForm<PatchTitleChecklistFormSchema>({
    resolver: zodResolver(patchTitleChecklistFormSchema)
  })

  const {mutate, isPending} = useMutation({
    mutationFn: (data: PatchTitleChecklistFormSchema) => patchTitleChecklist(checklistId, data),
    mutationKey: ['activitie'],
    onSuccess: () => {
      toast.success('Sucesso ao atualiar checklist')
      queryClient.invalidateQueries({queryKey: ['activitie']})
    },
    onError: () => {
      toast.error('Erro ao atualizar checklist')
    }
  })

  const onSubmit = (data: PatchTitleChecklistFormSchema) => {
    mutate(data)
  }

  return{onSubmit, form, isPending}
}