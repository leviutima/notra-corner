import { createColumn } from "@/service/column/create-column";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const createColumnFormSchema = z.object({
  title: z.string().nonempty("Título é obrigatório"),
});

type CreateColumnFormSchema = z.infer<typeof createColumnFormSchema>;
export function useColumn() {
  const [open, setIsOpen] = useState(false)
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
      queryClient.invalidateQueries({ queryKey: ["column"] });
      toast.success("Sucesso ao criar coluna");
      setIsOpen(false)
    },
    onError: () => {
      toast.error("Erro ao criar coluna")
      setIsOpen(false)
    }
  });

  const onSubmit = (data: CreateColumnFormSchema) => {
    const payload = {
      ...data,
      userId: user.id,
    };
    mutate(payload);
  };

  return { onSubmit, form, isPending, open, setIsOpen };
}
