"use client";

import { useLinks } from "@/hooks/useLinks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProfileIconUser } from "../../aside/profile-icon-user";
import { usePathname } from "next/navigation";
import { SearchBarHome } from "./search-bar-home";
import { Notes } from "./notes/notes";

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
        <SearchBarHome />
        <div className="flex items-center gap-5">
          <div>
            <Notes />
          </div>
          <ProfileIconUser firstLetter={user?.name} />
        </div>
      </div>
    </header>
  );
}
