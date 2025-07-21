import { createActivitie } from "@/service/activitie/create-activitie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createActivitieFormSchema = z.object({
  title: z.string().nonempty("Título da atividade é obrigatório"),
  description: z.string().nonempty("Descrição da atividade é obrigatório"),
});

type CreateActivieFormSchema = z.infer<typeof createActivitieFormSchema>;
export function useCreateActivitie(columnId: number) {
  const queryClient = useQueryClient()
  const formCreateActivitie = useForm<CreateActivieFormSchema>({
    resolver: zodResolver(createActivitieFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["activities"],
    mutationFn: async (data: CreateActivieFormSchema) => createActivitie(data),
    onSuccess: () => {
      toast.success("Sucesso ao criar atividade")
      queryClient.invalidateQueries({queryKey:["activities", columnId]})
    },
    onError: () => {
      toast.error("erro")
    }
  });

  const onSubmit = (data: CreateActivieFormSchema) => {
    const payload = {
      ...data,
      columnId,
    };
    mutate(payload);
  };

  return{formCreateActivitie, onSubmit, isPending}
}
