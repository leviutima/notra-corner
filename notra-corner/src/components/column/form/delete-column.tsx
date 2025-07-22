import { deleteColumn } from "@/service/column/delete-column";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface deleteColumnProps {
  columnId: number;
}

export function DeleteColumnEllipsis({ columnId }: deleteColumnProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteColumn(columnId),
    mutationKey: ["column"],
    onSuccess: () => {
      toast.success("Sucesso ao excluir coluna")
      queryClient.invalidateQueries({ queryKey: ["column"] });
    },
    onError: () => {
      toast.error("Erro ao excluir coluna, tente novamente")
    }
  });

  const onDelete = () => {
    mutate();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {" "}
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-red-600 cursor-pointer hover:bg-neutral-800" onClick={onDelete}>
          <Trash  className="text-red-600"/> Excluir coluna
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
