interface MenuItemProps {
  title: string;
  active: boolean;
}

export function MenuItem({ title, active = false }: MenuItemProps) {
  return (
    <div
      className={
        active
          ? "bg-neutral-700 p-1 rounded-md flex items-start justify-cstart w-[12vw]"
          : "text-white"
      }
    >
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}
