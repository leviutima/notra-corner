import { Plus } from "lucide-react";
import { FormCreateColumn } from "../form/form-create-column";
import { useColumn } from "@/hooks/forms/create-column";
import { Modal } from "../../modal";

export function CreateColumn() {
  const { form, onSubmit, isPending, open, setIsOpen } = useColumn();

  return (
    <Modal
      onOpenChange={setIsOpen}
      open={open}
      title="Adicionar coluna"
      trigger={
        <div className="flex items-center justify-start bg-neutral-600 p-2 rounded-md w-[200px] cursor-pointer hover:bg-neutral-700">
          <Plus />
          <h2>Adicionar coluna</h2>
        </div>
      }
      content={
        <FormCreateColumn
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
        />
      }
    />
  );
}
