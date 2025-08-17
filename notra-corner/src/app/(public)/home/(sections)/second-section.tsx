import { motion } from "framer-motion";

export function SecondSectionHome() {
  return (
    <section className="w-full py-20 border rounded-md bg-neutral-500 dark:bg-neutral-950 px-6 shadow-2xl">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          O que vem por aí?
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-lg">
          Estamos construindo novas funcionalidades para deixar sua organização
          ainda mais fluida e inteligente.
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
  );
}
