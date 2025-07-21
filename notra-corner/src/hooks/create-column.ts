import { createColumn } from "@/service/column/create-column";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const createColumnFormSchema = z.object({
  title: z.string().nonempty("Título é obrigatório"),
});

type CreateColumnFormSchema = z.infer<typeof createColumnFormSchema>;
export function useColumn() {
  const { user } = useSelector((state: RootState) => state.auth);
  const form = useForm<CreateColumnFormSchema>({
    resolver: zodResolver(createColumnFormSchema),
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: CreateColumnFormSchema & { userId: string }) =>
      createColumn(payload),
    mutationKey: ["column"],
    onSuccess: () => {
      toast.success("Sucesso ao criar coluna");
      queryClient.invalidateQueries({ queryKey: ["column"] });
    },
  });

  const onSubmit = (data: CreateColumnFormSchema) => {
    const payload = {
      ...data,
      userId: user.id,
    };
    mutate(payload);
  };

  return { onSubmit, form, isPending };
}
