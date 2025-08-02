import { TooltipComponent } from "@/components/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NotebookPen } from "lucide-react";

export function Notes() {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <NotebookPen />
      </SheetTrigger>
      <SheetContent className="bg-neutral-800">
        <SheetHeader>
          <SheetTitle>Bloco de notas</SheetTitle>
          <SheetDescription className="text-neutral-400">Spoiler da próxima atualização</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
