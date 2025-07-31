import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateChecklist } from "@/hooks/forms/create-checklist";
import { UseFormReturn } from "react-hook-form";

interface CreateChecklistFormSchema {
  title: string;
  finished: boolean;
  activitieId: string;
}

interface formCreateChecklistProps {
  form: UseFormReturn<CreateChecklistFormSchema>;
  onSubmit: (data: CreateChecklistFormSchema) => void;
  isPending: boolean;
}

export function FormCreateChecklist({
  form,
  isPending,
  onSubmit,
}: formCreateChecklistProps) {
  const { register, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Label>Título</Label>
        <Input {...register("title")} />
      </div>
      <Button className="cursor-pointer">
        {isPending ? "Carregando..." : "Criar"}
      </Button>
    </form>
  );
}
