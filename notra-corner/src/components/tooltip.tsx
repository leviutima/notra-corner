import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react";

interface toolTipComponentProps {
  trigger: React.ReactElement;
  label: string
}

export function TooltipComponent({trigger, label}: toolTipComponentProps) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer">{trigger}</TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
