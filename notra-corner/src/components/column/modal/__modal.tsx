import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface modalProps {
  open?: boolean,
  onOpenChange?: (open: boolean) => void,
  title: string,
  trigger: React.ReactElement,
  content: React.ReactElement,
}

export function Modal({open, onOpenChange, title, content, trigger}: modalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
