"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/hooks/forms/form-sign-up";

export default function SignUp() {
  const {formSignUp, isPending, onSubmit} = useSignUp()
  const {register, handleSubmit, formState: {errors} } = formSignUp

  return (
    <div className="flex flex-col gap-5 items-center ">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold md:text-[30px] text-[25px]">Comece sua jornada!</h1>
        <span>Seja bem vindo</span>
        <span></span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4  max-w-md rounded-md lg:w-[500px] md:w-[600px] w-[300px] lg:bg-transparent bg-neutral-800 p-5" >
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
