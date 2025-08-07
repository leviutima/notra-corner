import z from "zod";

export const updatePasswordUserFormSchema = z.object({
  userId: z.string(),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(6, "Senha deve conter no mínimo 6 caractéres"),
});

export type UpdatePasswordUserFormSchema = z.infer<
  typeof updatePasswordUserFormSchema
>;
