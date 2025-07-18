"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/service/auth/login";
import { loginRequest } from "@/store/auth/actions/action";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;
export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin = async (data: LoginFormSchema) => {
    console.log(`[Login] handleLogin chamado com: `, data);
    toast.loading("Carregando...");
    dispatch(loginRequest(data));
  };

  useEffect(() => {
    if (!user?.id) {
      toast.dismiss();
      router.push(`/home/${user?.id}`);
    }
  }, [user, router]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleLogin)}
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
        {error && <span>Erro ao realizar login</span>}
      </form>
    </div>
  );
}
