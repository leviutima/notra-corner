import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormCreateColumn } from "./form-create-column";

export function CreateColumn() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center justify-start bg-neutral-600 p-2 rounded-md w-[12vw] cursor-pointer hover:bg-neutral-700">
          <Plus />
          <h2>Adicionar coluna</h2>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-neutral-800">
        <DialogTitle>Criar nova coluna</DialogTitle>
        <FormCreateColumn />
      </DialogContent>
    </Dialog>
  );
}
