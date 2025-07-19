"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/hooks/form-login";
import { RootState } from "@/store/store";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SignIn() {
  const router = useRouter();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const {formLogin, onSubmit} = useLoginForm()
  const {register, handleSubmit, formState} = formLogin

  useEffect(() => {
    if (user && user.id) {
      router.push(`/home/${user.id}`);
    }
  }, [user?.id]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className=" flex-col gap-1 flex">
          <Label>Email</Label>
          <input
            type="email"
            placeholder="Digite seu email"
            {...register("email")}
            className="border border-neutral-300 p-2 w-full rounded-md"
          />
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
              <Eye
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
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            </div>
          )}
        </div>
        <Button
          disabled={loading}
          className="w-full cursor-pointer"
          type="submit"
        >
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        {error && (
          <span className="text-red-600">Email ou senha incorretos</span>
        )}
      </form>
    </div>
  );
}
