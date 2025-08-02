// components/footer/footer.tsx
"use client";

import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-neutral-950 py-10 px-6 text-sm text-neutral-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-white mb-2">NOTRA CORNER</h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            Um sistema leve para você organizar ideias, projetos e tarefas com clareza e propósito.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-neutral-800 dark:text-white mb-3">Produto</h3>
          <ul className="space-y-2">
            <li><Link href="#">Funcionalidades</Link></li>
            <li><Link href="#">Planos</Link></li>
            <li><Link href="#">Novidades</Link></li>
            <li><Link href="#">Ajuda</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-neutral-800 dark:text-white mb-3">Recursos</h3>
          <ul className="space-y-2">
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Comunidade</Link></li>
            <li><Link href="#">Guia de uso</Link></li>
            <li><Link href="#">Privacidade</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-neutral-800 dark:text-white mb-3">Conecte-se</h3>
          <ul className="flex gap-4">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5 hover:text-black dark:hover:text-white transition" />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 hover:text-black dark:hover:text-white transition" />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5 hover:text-black dark:hover:text-white transition" />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-5 h-5 hover:text-black dark:hover:text-white transition" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} NOTRA CORNER. Todos os direitos reservados.
      </div>
    </footer>
  );
}
