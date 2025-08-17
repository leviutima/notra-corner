"use client";

import { TogetherForm } from "../(form)/together-form";


export function FormSectionAbout() {
  return (
    <section className="w-full py-20 border rounded-md bg-neutral-800 px-6 shadow-2xl">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          Sua Ideia, Nosso SaaS
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-lg">
          Compartilhe sua ideia e ajude a criar funcionalidades que tornam seu
          dia a dia mais produtivo.
        </p>
      </div>
      <TogetherForm />
    </section>
  );
}
