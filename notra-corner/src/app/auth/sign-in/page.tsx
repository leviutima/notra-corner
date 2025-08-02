"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/hooks/forms/form-login";
import { RootState } from "@/store/store";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SignIn() {
  const router = useRouter();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const { formLogin, onSubmit } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formLogin;

  useEffect(() => {
    if (user && user.id) {
      router.push(`/home/${user.id}`);
    }
  }, [user?.id]);

  return (
    <div className="flex flex-col gap-5 md:mt-0 mt-24">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-[30px]">Volte para realidade</h1>
        <span className="text-neutral-400">Entre na sua conta</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-5 w-[350px] md:w-[500px] lg:bg-transparent p-5 rounded-md">
        <div className=" flex-col gap-1 flex">
          <Label>Email</Label>
          <input
            type="email"
            placeholder="Digite seu email"
            {...register("email")}
            className="border border-neutral-300 p-2 w-full rounded-md"
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className=" flex-col gap-1 flex">
          <Label>Senha</Label>
          {showPassword === false ? (
            <div className="border border-neutral-300 rounded-md flex items-center p-2">
              <input
                type="password"
                {...register("password")}
                placeholder="Digite sua senha"
                className="border-none outline-none w-full"
              />
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            </div>
          ) : (
            <div className="border border-neutral-300 rounded-md flex items-center p-2">
              <input
                type="text"
                {...register("password")}
                placeholder="Digite sua senha"
                className="border-none outline-none w-full"
              />
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            </div>
          )}
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Button
            disabled={loading}
            className="w-full cursor-pointer"
            type="submit"
          >
            {loading ? "Carregando..." : "Entrar"}
          </Button>
          <p className="text-[14px]">
            Não tem uma conta? Clique{" "}
            <Link href={"/auth/sign-up"} className="underline hover:text-neutral-500">
              AQUI
            </Link>{" "}
            para criar
          </p>
        </div>
        {error && (
          <span className="text-red-600">Email ou senha incorretos</span>
        )}
      </form>
    </div>
  );
}
