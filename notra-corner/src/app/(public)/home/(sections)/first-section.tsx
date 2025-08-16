import { motion } from "framer-motion";

export function FirstSectionHome() {
  return(
            <section className="grid md:grid-cols-3 gap-10 py-20 w-full max-w-6xl">
          {[
            {
              title: "Organização fluida",
              desc: "Transforme suas ideias em objetivos visuais. Ogranize sua vida de maneira clara e organizada",
            },
            {
              title: "Interface que entende você",
              desc: "Nada de excessos. Criamos um ambiente visual limpo e funcional para seu dia a dia.",
            },
            {
              title: "Juntos, moldamos o futuro",
              desc: "Cada funcionalidade começa com uma história real a sua. Participe da evolução.",
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
  )
}