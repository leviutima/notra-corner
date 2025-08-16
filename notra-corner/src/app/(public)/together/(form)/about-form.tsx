import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function AboutForm() {
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
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <Label>Nome</Label>
              <Input className="" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Sobrenome</Label>
              <Input />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <Input />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Título</Label>
            <Input />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Sugestão</Label>
            <Textarea />
          </div>
        </div>
        <Button className="cursor-pointer">Enviar</Button>
      </form>
    </div>
  );
}
