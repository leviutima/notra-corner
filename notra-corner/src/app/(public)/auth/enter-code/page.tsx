"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseEnterVerificationCode } from "@/hooks/forms/enter-verification-code";

export default function EnterCode() {
  const { form, isPending, onSubmit } = UseEnterVerificationCode();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center">
        <h1 className="font-semibold text-[30px]">
          Insira o código de verificação
        </h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label>Código</Label>
            <div className="flex items-center gap-1">
              <Input {...register("code")} />
              <Button className="cursor-pointer">
                {isPending ? "Carregando" : "Verificar"}
              </Button>
            </div>
            {errors.code && (
              <span className="text-red-600">{errors.code.message}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
