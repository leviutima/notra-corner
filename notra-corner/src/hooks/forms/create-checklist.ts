import { useForm } from "react-hook-form";
import { createChecklistFormSchema, CreateChecklistFormSchema } from "../schemas/checklist-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChecklist } from "@/service/checklist/create-checklist";

interface useCreateActivitieProps {
  activitieId: string
}

export function useCreateChecklist({activitieId}: useCreateActivitieProps) {
  const queryClient = useQueryClient()
  const form = useForm<CreateChecklistFormSchema>({
    resolver: zodResolver(createChecklistFormSchema),
    defaultValues: {
      finished: false
    }
  })

  const {mutate, isPending} = useMutation({
    mutationFn: (data: CreateChecklistFormSchema) => createChecklist(data),
    mutationKey: ['checklist'],
    onSuccess: () => [
      queryClient.invalidateQueries({queryKey: ['checklist']})
    ]
  })

  const onSubmit = (data: CreateChecklistFormSchema) => {
    mutate(data)
  }

  return {form, onSubmit, isPending}
}