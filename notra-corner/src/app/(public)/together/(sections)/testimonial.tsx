"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ana Souza",
    role: "Designer",
    text: "Adorei poder sugerir melhorias, a equipe realmente escuta os usuários!",
  },
  {
    name: "Carlos Mendes",
    role: "Desenvolvedor",
    text: "Minha sugestão entrou no roadmap e já está em desenvolvimento!",
  },
  {
    name: "Mariana Oliveira",
    role: "Gerente de Projetos",
    text: "A plataforma ficou muito mais produtiva depois das últimas atualizações.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full py-20 px-6 rounded-md">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10"
        >
          Veja o que outros já sugeriram ✨
        </motion.h2>

        {/* Cards de depoimentos */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="shadow-lg rounded-2xl p-6 text-left bg-transparent"
            >
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 italic">
                “{item.text}”
              </p>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                {item.name}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                {item.role}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
