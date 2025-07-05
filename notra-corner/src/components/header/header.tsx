import { Button } from "../ui/button";
import { Menu } from "./menu";
import { MenuButtons } from "./menu-buttons";

export function Header() {
  return (
    <header className="px-10 py-5 flex items-center justify-around">
      <div className="border border-neutral-400 rounded-md p-2 shadow-md">
        <h1 className="font-medium text-[40px] font">NC</h1>
      </div>
      <Menu />
      <MenuButtons />
    </header>
  );
}
