"use client";

import Link from "next/link";
import { ModeToggle } from "../theme/toggle";
import { MenuItem } from "./menu-item";
import { useLinks } from "@/hooks/useLinks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProfileIconUser } from "./profile-icon-user";
import { usePathname } from "next/navigation";

export function AsideHome() {
  const links = useLinks();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  if (loading) {
    return <span>carregando...</span>;
  }

  return (
    <aside className="dark:bg-neutral-800 dark:border-r-neutral-500 border bg-neutral-300 border-r-neutral-500  flex flex-col items-start w-[240px] h-[100vh] shadow-md ">
      <div className="flex flex-col gap-5 items-start justfy-start pl-2 py-4">
        <div>
          <ProfileIconUser
            firstLetter={user?.name}
            userName={user?.name}
            surname={user?.surname}
          />
        </div>
        <ul>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href}>
                  <MenuItem icon={link.icon} title={link.label} active={isActive} />
                </Link>
              </li>
            );
          })}
        </ul>
        <div>
          <ModeToggle />
        </div>
      </div>
    </aside>
  );
}
