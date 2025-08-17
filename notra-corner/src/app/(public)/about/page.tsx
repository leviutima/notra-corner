'use client'

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundSize: "200% 200%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <main className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-10">
        
      </main>
    </div>
  );
}
