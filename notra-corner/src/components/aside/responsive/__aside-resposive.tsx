"use client";

import { useLinks } from "@/hooks/useLinks";
import Link from "next/link";
import { MenuItem } from "../menu-item";
import { usePathname } from "next/navigation";
import { ProfileIconUser } from "../profile-icon-user";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function AsideResponsive() {
  const links = useLinks();
  const pathname = usePathname();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  return (
    <footer className="bg-neutral-800 p-5">
      <div className="flex items-center justify-between">
        <div></div>
        <div>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="list-none">
                <Link href={link.href}>
                  <MenuItem icon={link.icon} active={isActive} />
                </Link>
              </li>
            );
          })}
        </div>
        <ProfileIconUser firstLetter={user?.name} />
      </div>
    </footer>
  );
}
