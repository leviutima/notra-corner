"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/service/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFormSchema) => login(data),
    onSuccess: () => {
        console.log("sucesso");
        
      toast.success("Sucesso ao logar");
    },
  });

  const onSubmit = (data: LoginFormSchema) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? "Carregando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
