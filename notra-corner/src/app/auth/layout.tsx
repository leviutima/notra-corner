import authImg from "@/assets/authimg.png";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-neutral-900 bg-gray-100">
      {/* Imagem - aparece apenas em telas md+ */}
      <div className="relative w-full lg:w-1/2 h-64 md:h-auto hidden lg:block">
        <Image
          src={authImg}
          alt="Imagem de autenticação"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Conteúdo */}
      <main className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}
