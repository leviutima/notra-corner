"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerificationCode } from "@/context/useVerificationCodeDatas";
import { UseUpdatePassword } from "@/hooks/forms/update-password";

export default function () {
  const { form, isPending, onSubmit } = UseUpdatePassword();
    const { userIdCode } = useVerificationCode();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  console.log(userIdCode);
  

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center flex-col justify-center">
        <h1 className="text-[30px] font-semibold">Atualize sua senha</h1>
        <span className="text-[14px] text-neutral-500">Insira sua senha</span>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label>Senha</Label>
            <div className="flex items-center gap-1">
              <Input {...register("password")} />
              <Button type="submit" className="cursor-pointer">
                {isPending ? "Carregando" : "Atualizar"}
              </Button>
            </div>
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
