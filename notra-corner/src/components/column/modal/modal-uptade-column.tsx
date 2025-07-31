import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateColumn } from "@/hooks/forms/update-column";
import { Pencil } from "lucide-react";

interface useUpdateColumnProps {
  columnId: number;
}

export function EditColumn({ columnId }: useUpdateColumnProps) {
  const { onSubmit, formUpdate, isPending } = useUpdateColumn({ columnId });

  const { register, handleSubmit } = formUpdate;

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="" /> Editar Coluna
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar coluna</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Título</Label>
            <Input {...register("title")} />
          </div>
          <Button type="submit">
            {isPending ? "Carregando..." : "Atualizar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
