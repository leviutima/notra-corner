import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSectionHome() {
  return (
    <section className="max-w-3xl text-center py-20">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Organize sua vida com NOTRA CORNER
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Uma forma leve e intuitiva de acompanhar suas tarefas e projetos, com a
        elegância que você merece.
      </motion.p>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Button className="text-base bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-4 rounded-md hover:brightness-110 transition">
          Comece agora
        </Button>
      </motion.div>
    </section>
  );
}
