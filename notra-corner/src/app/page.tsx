"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header/header-LP/header";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer/footer-app";

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="min-h-screen flex flex-col items-center px-6  pt-10">
        <section className="max-w-3xl text-center py-20">
          <motion.h1
            className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Organize sua vida com
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-neutral-500 mt-6"
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
            <Button className=" text-base bg-neutral-600 p-6 hover:bg-neutral-800 text-white rounded-md cursor-pointer">
              Comece agora
            </Button>
          </motion.div>
        </section>
        <section className="grid md:grid-cols-3 gap-10 py-20   w-full max-w-6xl">
          {[
            {
              title: "Organização fluida",
              desc: "Transforme suas ideias em movimento com quadros Kanban pensados para clareza e foco. É você no controle, com leveza e direção.",
            },
            {
              title: "Interface que entende você",
              desc: "Nada de excessos. Criamos um ambiente visual limpo e funcional, para que cada clique ajude você a chegar mais longe, com mais leveza no dia a dia.",
            },
            {
              title: "Juntos, moldamos o futuro",
              desc: "Cada funcionalidade começa com uma história real a sua. Participe, sugira e ajude a construir uma ferramenta que cresce com você.",
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
              <h3 className="text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-neutral-500">{item.desc}</p>
            </motion.div>
          ))}
        </section>
        <section className="w-full py-20 border-t bg-neutral-50 dark:bg-neutral-950 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-neutral-900 border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="text-3xl mb-4">🗒️</div>
                <h3 className="text-2xl font-semibold mb-3">
                  Novo bloco de notas integrado
                </h3>
                <p className="text-neutral-500 text-base">
                  Agora você pode anotar ideias soltas, insights rápidos ou
                  lembretes diretamente no seu espaço de organização. Tudo salvo
                  em tempo real, acessível de qualquer lugar.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-neutral-900 border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="text-3xl mb-4">📆</div>
                <h3 className="text-2xl font-semibold mb-3">
                  Calendário com monitoramento inteligente
                </h3>
                <p className="text-neutral-500 text-base">
                  Visualize suas tarefas no tempo certo. O calendário foi
                  reformulado para ajudar você a planejar e acompanhar suas
                  entregas com clareza e sem sobrecargas.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 w-full border-t text-center px-6">
          <motion.h2
            className="text-3xl font-semibold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Sua produtividade começa aqui.
          </motion.h2>

          <motion.p
            className="text-neutral-500 mb-10 max-w-2xl mx-auto text-lg"
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
                desc: "Organize suas ideias e deixe sua mente livre para o que realmente importa. Menos estresse, mais foco.",
              },
              {
                icon: "⏳",
                title: "Tempo com propósito",
                desc: "Gerencie seu dia com eficiência. Gaste menos energia decidindo e mais fazendo.",
              },
              {
                icon: "🌱",
                title: "Crescimento constante",
                desc: "Pequenas ações diárias criam grandes mudanças. Acompanhe sua evolução de forma leve e motivadora.",
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
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-neutral-500">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Button className="text-base bg-neutral-800 px-8 py-4 hover:bg-black text-white rounded-md cursor-pointer">
              Criar meu espaço agora
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
