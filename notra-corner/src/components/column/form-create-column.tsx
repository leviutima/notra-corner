import { useColumn } from "@/hooks/create-column";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export function FormCreateColumn() {
  const { form, isPending, onSubmit } = useColumn();
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
        {errors.title && <span className="text-red-600">{errors.title.message}</span>}
      </div>
      <Button className="cursor-pointer">
        {isPending ? "Carregando" : "Criar"}
      </Button>
    </form>
  );
}
