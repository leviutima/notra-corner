"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/service/user/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const signUpFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  surname: z.string().optional(),
  email: z
    .string()
    .email("Digite um email válido")
    .nonempty("Email é obrigatório"),
  password: z
    .string()
    .min(6, "Mínimo de caracttéres é 6")
    .nonempty("Senha é obrigatório"),
  birthDate: z.string(),
});

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: SignUpFormSchema) => createUser(data),
  });

  const onSubmit = (data: SignUpFormSchema) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label>Nome</Label>
          <Input placeholder="Digite seu nome" {...register("name")} />
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Sobrenome</Label>
          <Input placeholder="Digite seu sobrenome" {...register("surname")} />
          {errors.surname && (
            <span className="text-red-600">{errors.surname.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input placeholder="Digite seu email" {...register("email")} />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Senha</Label>
          <Input placeholder="Digite uma senha" {...register("password")} />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Data de nascimento</Label>
          <Input type="date" {...register("birthDate")} />
          {errors.birthDate && (
            <span className="text-red-600">{errors.birthDate.message}</span>
          )}
        </div>
        <Button type="submit" className="cursor-pointer" disabled={isPending}>
          {isPending ? "Carregando..." : "Criar conta"}
        </Button>
      </form>
    </div>
  );
}
