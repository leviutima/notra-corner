import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";

interface CreateActivieFormSchema {
  title: string;
  description?: string;
}

interface FormCreateActiviteProps {
  form: UseFormReturn<CreateActivieFormSchema>;
  onSubmit: (data: CreateActivieFormSchema) => void;
  isPending: boolean;
}

export function FormCreateActivite({ form, onSubmit, isPending }: FormCreateActiviteProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label>Título</Label>
        <Input {...register("title")} />
        {errors.title && <span className="text-red-600">{errors.title.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Descrição</Label>
        <Input {...register("description")} />
      </div>
      <Button type="submit">{isPending ? "Carregando..." : "Criar atividade"}</Button>
    </form>
  );
}
