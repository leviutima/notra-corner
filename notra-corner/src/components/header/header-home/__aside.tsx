"use client";

import Link from "next/link";
import { ModeToggle } from "../../theme/toggle";
import { MenuItem } from "../../aside/menu-item";
import { useLinks } from "@/hooks/useLinks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProfileIconUser } from "../../aside/profile-icon-user";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export function HeaderHome() {
  const links = useLinks();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  if (loading) {
    return <span>carregando...</span>;
  }

  return (
    <header className="dark:bg-neutral-800 bg-neutral-300 w-full shadow-md px-10 py-5">
      <div className="flex items-center justify-between">
        <div>a</div>
        <div>
          <div className="border border-neutral-300 flex items-centert rounded-sm p-2 bg-neutral-900 w-[30vw]">
            <input type="text" className="w-full outline-none"/>
            <Search />
          </div>
        </div>
        <div>a</div>
      </div>
    </header>
  );
}
