import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateActivitie } from "@/hooks/create-activitie";
interface FormCreateActiviteProps {
  columnId: number;
}

export function FormCreateActivite({ columnId }: FormCreateActiviteProps) {
  const { formCreateActivitie, onSubmit, isPending } =
    useCreateActivitie(columnId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formCreateActivitie;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label>Título</Label>
        <Input {...register("title")} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Descrição</Label>
        <Input {...register("description")} />
      </div>
      <Button className="cursor-pointer">{isPending ? "Carregando..." : "Criar atividade"}</Button>
    </form>
  );
}
