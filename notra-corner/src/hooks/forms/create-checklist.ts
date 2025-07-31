import { useForm } from "react-hook-form";
import {
  createChecklistFormSchema,
  CreateChecklistFormSchema,
} from "../schemas/checklist-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChecklist } from "@/service/checklist/create-checklist";
import { toast } from "sonner";
import { useState } from "react";

interface useCreateActivitieProps {
  activitieId: string;
}

export function useCreateChecklist({ activitieId }: useCreateActivitieProps) {
  const [open, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<CreateChecklistFormSchema>({
    resolver: zodResolver(createChecklistFormSchema),
    defaultValues: {
      activitieId: activitieId,
      finished: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateChecklistFormSchema) => createChecklist(data),
    mutationKey: ["activitie"],
    onSuccess: () => {
      toast.success("Sucesso ao criar activitie");
      queryClient.invalidateQueries({ queryKey: ["activitie"] });
      setIsOpen(false);
    },
    onError: () => {
      setIsOpen(false);
      toast.error("Erro ao criar activitie");
    },
  });

  const onSubmit = (data: CreateChecklistFormSchema) => {
    mutate(data);
  };

  return { form, onSubmit, isPending, open, setIsOpen };
}
