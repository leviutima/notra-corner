"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header/header-LP/header";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer/footer-app";

export default function Home() {
  return (
    <div className="relative overflow-hidden dark:bg-neutral-950">
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-10 blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <Header />
      <main className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-10">
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
            Uma forma leve e intuitiva de acompanhar suas tarefas e projetos,
            com a elegância que você merece.
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
        <section className="grid md:grid-cols-3 gap-10 py-20 w-full max-w-6xl">
          {[
            {
              title: "Organização fluida",
              desc: "Transforme suas ideias em movimento com quadros Kanban pensados para clareza e foco.",
            },
            {
              title: "Interface que entende você",
              desc: "Nada de excessos. Criamos um ambiente visual limpo e funcional para seu dia a dia.",
            },
            {
              title: "Juntos, moldamos o futuro",
              desc: "Cada funcionalidade começa com uma história real — a sua. Participe da evolução.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                {item.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </section>
        <section className="w-full py-20 border rounded-md bg-neutral-500 dark:bg-neutral-950 px-6 shadow-2xl">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
              O que vem por aí?
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-lg">
              Estamos construindo novas funcionalidades para deixar sua
              organização ainda mais fluida e inteligente.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {[
              {
                icon: "🗒️",
                title: "Novo bloco de notas integrado",
                desc: "Capture ideias no instante em que surgirem. Registre anotações, insights e lembretes sem interromper seu fluxo de trabalho.",
              },
              {
                icon: "📆",
                title: "Calendário com monitoramento inteligente",
                desc: "Visualize suas tarefas no tempo certo, receba lembretes automáticos e mantenha o controle total dos seus prazos.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-neutral-900 border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
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
            Um espaço claro. Uma mente leve. Um sistema que funciona com você —
            e não contra você.
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
      </main>

      <Footer />
    </div>
  );
}
