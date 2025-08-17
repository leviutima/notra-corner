import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTogether } from "@/hooks/forms/create-together";

export function TogetherForm() {
  const { form, isPending, onSubmit } = useTogether();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex items-start justify-center gap-10">
      <div>
        <motion.img
          src="/images/undraw_data-input_whqw.svg"
          alt="Workspace minimalista"
          className="flex-1 w-[50vw] max-w-sm"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <Label>Nome</Label>
              <Input {...register("name")} />
              {errors.name && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label>Sobrenome</Label>
              <Input {...register("surname")} />
              {errors.surname && (
                <span className="text-red-600">{errors.surname.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <Input {...register("email")} />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label>Sugestão</Label>
            <Textarea {...register("suggestion")} className="w-[380px]"/>
            {errors.suggestion && (
              <span className="text-red-600">{errors.suggestion.message}</span>
            )}
          </div>
        </div>
        <Button className="cursor-pointer" type="submit" disabled={isPending}>
          {isPending ? "Carregando" : "Enviar"}
        </Button>
      </form>
    </div>
  );
}
