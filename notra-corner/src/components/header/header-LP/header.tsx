"use client";

import Image from "next/image";
import darkLogo from "@/assets/logo-dark.png";
import lightLogo from "@/assets/logo-white.png";
import { Menu } from "./menu";
import { MenuButtons } from "./menu-buttons";
import { MenuMobile } from "./menu-mobile";

export function Header() {
  return (
    <header className="w-full px-6 md:px-10 py-5 flex items-center justify-between md:justify-around">
      <div className="block dark:hidden">
        <Image src={darkLogo} alt="Logo notra-corner" width={70} />
      </div>
      <div className="hidden dark:block">
        <Image src={lightLogo} alt="Logo notra-corner" width={30} />
      </div>
      <div className="hidden md:flex">
        <Menu />
      </div>
      <div className="hidden md:flex">
        <MenuButtons />
      </div>
      <div className="md:hidden">
        <MenuMobile />
      </div>
    </header>
  );
}
