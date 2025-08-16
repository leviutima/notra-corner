"use client";

import Image from "next/image";
import lightLogo from "@/assets/logo-white.png";
import { Menu } from "./menu";
import { MenuButtons } from "./menu-buttons";
import { MenuMobile } from "./menu-mobile";

export function Header() {
  return (
    <header className="w-full px-6 md:px-10 py-5 flex items-center justify-between md:justify-around">
      <div className="">
        <Image src={lightLogo} alt="Logo notra-corner" width={30} />
      </div>
      <div className="hidden md:flex ml-36">
        <Menu />
      </div>
      <div className="hidden md:flex ">
        <MenuButtons />
      </div>
      <div className="md:hidden">
        <MenuMobile />
      </div>
    </header>
  );
}
