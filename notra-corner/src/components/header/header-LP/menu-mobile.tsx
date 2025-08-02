"use client";

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MenuMobile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        {open ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-56 bg-white dark:bg-neutral-900 shadow-lg rounded-lg z-50 p-4 space-y-4 text-sm">
          <nav className="flex flex-col space-y-3">
            <Link href="/" onClick={() => setOpen(false)}>Início</Link>
            <Link href="#planos" onClick={() => setOpen(false)}>Planos</Link>
            <Link href="#sobre" onClick={() => setOpen(false)}>Sobre nós</Link>
            <Link href="#contato" onClick={() => setOpen(false)}>Contato</Link>
          </nav>
          <div className="border-t pt-4 flex flex-col gap-3">
            <Link href="/auth/sign-in" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link href="/auth/sign-up" onClick={() => setOpen(false)}>
              <Button className="w-full">Comece agora</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
