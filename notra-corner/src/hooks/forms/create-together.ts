import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateTogetherFormSchema,
  createTogetherFormSchema,
} from "../schemas/together-schema";
import { useMutation } from "@tanstack/react-query";
import { createSuggestion } from "@/service/suggestion/create-suggestion";
import { toast } from "sonner";

export function useTogether() {
  const form = useForm<CreateTogetherFormSchema>({
    resolver: zodResolver(createTogetherFormSchema),
  });

  const { reset } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateTogetherFormSchema) => createSuggestion(data),
    mutationKey: ["suggestion"],
    onSuccess: () => {
      reset()
      toast.success("Sugestão enviada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao enviar sugestão, tente novamente");
    },
  });

  const onSubmit = (data: CreateTogetherFormSchema) => {
    console.log(data);

    mutate(data);
  };
  return { onSubmit, form, isPending };
}
