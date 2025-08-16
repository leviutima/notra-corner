import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThirdSection() {
  return (
    <section className="py-20 w-full border-t text-center px-6">
      <motion.h2
        className="text-3xl font-semibold mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Sua produtividade começa aqui.
      </motion.h2>

      <motion.p
        className="text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Um espaço claro. Uma mente leve. Um sistema que funciona com você — e
        não contra você.
      </motion.p>

      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {[
          {
            icon: "🧠",
            title: "Clareza mental",
            desc: "Organize suas ideias e deixe sua mente livre para o que realmente importa.",
          },
          {
            icon: "⏳",
            title: "Tempo com propósito",
            desc: "Gerencie seu dia com eficiência. Menos energia decidindo, mais agindo.",
          },
          {
            icon: "🌱",
            title: "Crescimento constante",
            desc: "Pequenas ações diárias criam grandes mudanças. Evolua com leveza.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="border rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 * i }}
            viewport={{ once: true }}
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-medium mb-2 text-indigo-600 dark:text-indigo-400">
              {item.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <Button className="text-base bg-gradient-to-r from-indigo-500 to-pink-500 px-8 py-4 text-white rounded-md hover:brightness-110 transition">
          Criar meu espaço agora
        </Button>
      </motion.div>
    </section>
  );
}
