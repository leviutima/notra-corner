import { updateColumn } from "@/service/column/update-column";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface updateColumnProps {
  columnId: number;
}

const updateColumnFormSchema = z.object({
  title: z.string(),
});

type UpdateColumnFormSchema = z.infer<typeof updateColumnFormSchema>;
export function useUpdateColumn({ columnId }: updateColumnProps) {
  const queryClient = useQueryClient();
  const [hasSuccess, setHasSuccess] = useState(false);
  const formUpdate = useForm<UpdateColumnFormSchema>({
    resolver: zodResolver(updateColumnFormSchema),
  });
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (data: UpdateColumnFormSchema) =>
      updateColumn(columnId, data),
    mutationKey: ["column" ],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["column"] });
      setHasSuccess(true);
    },
    onError: () => {
      setHasSuccess(false);
    },
  });

  const onSubmit = async (data: UpdateColumnFormSchema) => {
    mutate(data);
  };

  return { onSubmit, formUpdate, isPending, hasSuccess, setHasSuccess};
}
