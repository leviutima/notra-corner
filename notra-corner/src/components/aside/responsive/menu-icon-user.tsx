import { Columns3, LucideIcon } from "lucide-react";

interface MenuIconProps {
  active: boolean;
  icon: LucideIcon
}

export function MenuIconUser({ active = false , icon: Icon}: MenuIconProps) {
  return (
    <div
      className={
        active
          ? "dark:font-semibold  py-1 px-2 rounded-md"
          : "text-neutral-600"
      }
    >
      <h2 className="text-[15px] font-medium flex items-center gap-1"><Icon size={18}/></h2>
    </div>
  );
}
