import Image from "next/image";
import darkLogo from "@/assets/logo-dark.png";
import lightLogo from "@/assets/logo-white.png";
import { Menu } from "./menu";
import { MenuButtons } from "./menu-buttons";

export function Header() {
  return (
    <header className="px-10 py-5 flex items-center justify-around">
      <div className="block dark:hidden">
        <Image src={darkLogo} alt="Logo notra-corner" width={70} />
      </div>
      <div className="hidden dark:block">
        <Image src={lightLogo} alt="Logo notra-corner" width={70} />
      </div>

      <Menu />
      <MenuButtons />
    </header>
  );
}
