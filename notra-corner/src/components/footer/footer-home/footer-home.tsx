'use client'

import { MenuItem } from "@/components/aside/menu-item"
import { useLinks } from "@/hooks/useLinks"
import { useParams, usePathname } from "next/navigation"

export function FooterHome() {
  const links = useLinks()
  const pathname = usePathname()

  return(
    <footer className="bg-neutral-800 rounded-t-md">
      <div className="p-5">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return(
            <MenuItem key={link.href} icon={link.icon} active={isActive} titleHover={link.label}/>
          )
        })}
      </div>
    </footer>
  )
}