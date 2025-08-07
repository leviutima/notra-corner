import { Columns3, LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuItemProps {
  title?: string;
  active?: boolean;
  icon: LucideIcon;
  titleHover?: string
}

export function MenuItem({ title, active = false, icon: Icon, titleHover }: MenuItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer">
        {" "}
        <div
          className={
            active
              ? "dark:font-semibold  py-1 px-2 rounded-md"
              : "text-neutral-600"
          }
        >
          <h2 className="text-[15px] font-medium flex items-center gap-1">
            <Icon size={20} />
            {title}
          </h2>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {titleHover}
      </TooltipContent>
    </Tooltip>
  );
}
