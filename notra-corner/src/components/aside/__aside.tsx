"use client";

import Link from "next/link";
import { ModeToggle } from "../theme/toggle";
import { MenuItem } from "./menu-item";
import { useLinks } from "@/hooks/useLinks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProfileIconUser } from "./profile-icon-user";

export function AsideHome() {
  const links = useLinks();
  const { user,loading } = useSelector((state: RootState) => state.auth);

  console.log(user);
  
  if(loading) {
     return (
    <span>carregando...</span>
  );
  }

  return (
    <aside className="bg-neutral-800 flex flex-col items-start w-[15vw]">
      <div className="flex flex-col items-start justfy-start px-5">
        <div>
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              <ul>
                <MenuItem title={link.label} />
              </ul>
            </Link>
          ))}
        </div>
        <div>
          <div>
            <ProfileIconUser firstLetter={user?.name}/>
          </div>
          <ModeToggle />
        </div>
      </div>
    </aside>
  );
}
