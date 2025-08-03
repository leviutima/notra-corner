"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-neutral-900 bg-gray-100 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 opacity-10 blur-3xl z-0"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Texto motivacional */}
      <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center items-center p-10 gap-10 text-neutral-800 dark:text-white z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-center leading-tight tracking-tight"
        >
          Bem-vindo à{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Notra Corner
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl text-center max-w-md leading-relaxed"
        >
          Um sistema feito para empoderar ideias, organizar tarefas e manter o
          foco no que importa.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg text-center max-w-md text-gray-700 dark:text-gray-300"
        >
          Produtividade com propósito. Clareza com simplicidade.
        </motion.p>

        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm text-center italic text-gray-500 dark:text-gray-400"
        >
          "Organize, crie, entregue."
        </motion.span>
      </div>
      <main className="w-full lg:w-1/2 flex items-center justify-center  p-6 lg:pr-20 z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
           className="w-full max-w-md bg-white/20 dark:bg-neutral-950/20 backdrop-blur-md border border-white/30 dark:border-neutral-500/30 shadow-xl rounded-2xl p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
