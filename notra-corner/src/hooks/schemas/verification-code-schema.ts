import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import z from "zod";



export const verificationCodeFormShcema = z.object({
  userId: z.string().optional(),
  code: z
    .string()
    .nonempty("Código é obrigatório")
    .min(6, "São precisos 6 dígitos para validar o código"),
});

export type VerificationCodeFormSchema = z.infer<typeof verificationCodeFormShcema>
