import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function ModalCreateActivitie() {
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div className="bg-neutral-900 p-1 rounded-md cursor-pointer hover:bg-neutral-700">
          <div className="flex items-center gap-2">
            <Plus size={20} />
            <h2>Adicionar cartão</h2>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
