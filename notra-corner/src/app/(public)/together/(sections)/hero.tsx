"use client";

import { motion } from "framer-motion";

export function HeroSectionAbout() {
  return (
    <section className="max-w-6xl mx-auto py-20 flex flex-col md:flex-row items-center gap-10">
      {/* Texto */}
      <div className="flex-1 text-start">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Crie a resposta para sua produtividade
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Notra Corner ajuda você a ser mais produtivo, com ferramentas feitas a
          partir das suas sugestões, de forma simples e gratuita.
        </motion.p>
      </div>
      <motion.img
        src="/images/undraw_ideas_vn7a.svg" 
        alt="Workspace minimalista"
        className="flex-1 w-full max-w-sm"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </section>
  );
}
