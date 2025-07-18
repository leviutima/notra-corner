export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col gap-5">
      <div className="flex flex-col items-center">
        <h1 className="font-medium text-[40px]">Seja Bem Vindo</h1>
        <span className="text-neutral-400">Crie sua conta para começar</span>
      </div>
      <main className="w-full max-w-md p-6 bg-white rounded shadow border border-neutral-300">
        {children}
      </main>
    </div>
  );
}
