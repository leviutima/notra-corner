"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/service/auth/login";
import { loginRequest } from "@/store/auth/actions/action";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const router = useRouter()
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });


  const handleLogin = async(data: LoginFormSchema) => {
    console.log(`[Login] handleLogin chamado com: `, data);
    toast.loading("Carregando...")
    dispatch(loginRequest(data))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Digite seu email"
            {...register("email")}
          />
        </div>
        <div>
          <Label>Senha</Label>
          <Input
            type="password"
            {...register("password")}
            placeholder="Digite sua senha"
          />
        </div>
        <Button disabled={loading} className="w-full" type="submit">
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        {error && (
          <span>Erro ao realizar login</span>
        )}
      </form>
    </div>
  );
}
