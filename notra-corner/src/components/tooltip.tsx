import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react";

interface toolTipComponentProps {
  children: React.ReactNode;
  label: string
}

export function TooltipComponent({children, label}: toolTipComponentProps) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer" asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
