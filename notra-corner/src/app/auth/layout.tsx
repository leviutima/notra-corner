export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-neutral-900 bg-gray-100 flex-col gap-5">
      <div className="flex flex-col items-center">
        <h1 className="font-medium text-[40px]">Seja Bem Vindo</h1>
        <span className="text-neutral-400">Crie sua conta para começar</span>
      </div>
      <main className="w-full max-w-md p-6 dark:bg-neutral-800 dark:border-neutral-700 bg-white rounded shadow-md border border-neutral-300">
        {children}
      </main>
    </div>
  );
}
