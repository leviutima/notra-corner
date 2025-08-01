import { useColumn } from "@/hooks/forms/create-column";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";

interface CreateColumnFormSchema {
  title: string
}

interface formCreateColumnProps {
  form: UseFormReturn<CreateColumnFormSchema>;
  onSubmit: (data: CreateColumnFormSchema) => void;
  isPending: boolean
}

export function FormCreateColumn({form,isPending,onSubmit}: formCreateColumnProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col gap-2">
        <Label>Titulo</Label>
        <Input placeholder="Digite o título da coluna" {...register("title")} />
        {errors.title && (
          <span className="text-red-600">{errors.title.message}</span>
        )}
      </div>
      <Button className="cursor-pointer">
        {isPending ? "Carregando" : "Criar"}
      </Button>
    </form>
  );
}
