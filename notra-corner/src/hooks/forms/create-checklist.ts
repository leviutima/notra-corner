import { useForm } from "react-hook-form";
import { createChecklistFormSchema, CreateChecklistFormSchema } from "../schemas/checklist-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChecklist } from "@/service/checklist/create-checklist";
import { toast } from "sonner";

interface useCreateActivitieProps {
  activitieId: string
}

export function useCreateChecklist({activitieId}: useCreateActivitieProps) {
  const queryClient = useQueryClient()
  const form = useForm<CreateChecklistFormSchema>({
    resolver: zodResolver(createChecklistFormSchema),
    defaultValues: {
      activitieId: activitieId,
      finished: false
    }
  })

  const {mutate, isPending} = useMutation({
    mutationFn: (data: CreateChecklistFormSchema) => createChecklist(data),
    mutationKey: ['checklist'],
    onSuccess: () => {
      toast.success("Sucesso ao criar checklist")
      queryClient.invalidateQueries({queryKey: ['checklist']})
    },
    onError: () => {
      toast.error("Erro ao criar checklist")
    }
  })

  const onSubmit = (data: CreateChecklistFormSchema) => {
    mutate(data)
  }

  return {form, onSubmit, isPending}
}