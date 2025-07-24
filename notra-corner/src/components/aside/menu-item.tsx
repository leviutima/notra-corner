import { Columns3, LucideIcon } from "lucide-react";

interface MenuItemProps {
  title: string;
  active: boolean;
  icon: LucideIcon
}

export function MenuItem({ title, active = false , icon: Icon}: MenuItemProps) {
  return (
    <div
      className={
        active
          ? "dark:font-semibold  py-1 px-2 rounded-md"
          : "text-neutral-600"
      }
    >
      <h2 className="text-[15px] font-medium flex items-center gap-1"><Icon size={18}/>{title}</h2>
    </div>
  );
}
