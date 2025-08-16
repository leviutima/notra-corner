"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "@/hooks/forms/forgot-password";
import { ArrowRight } from "lucide-react";

export default function ForgotPassword() {
  const { form, onSubmit, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold md:text-[45px] text-[25px]">
          Esqueceu a senha?
        </h1>
        <span className="text-[14px] text-neutral-400 text-center">
          Insira seu email, lhe enviaremos um código para recuperação da sua
          senha
        </span>
      </div>
      <div className="md:w-[400px] w-[300px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <div className="flex items-center gap-2">
              <Input {...register("email")} />

              <div className="md:flex hidden">
                <Button type="submit" className="cursor-pointer">
                  {isPending ? "Carregando..." : "Enviar"}
                </Button>
              </div>
              <div>
                {" "}
                <div className="md:hidden">
                  <Button type="submit" className="cursor-pointer">
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
