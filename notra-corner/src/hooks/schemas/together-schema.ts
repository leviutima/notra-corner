import z from "zod";

export const createTogetherFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  surname: z.string().nonempty("Sobrenome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("Email é obrigatório"),
  suggestion: z.string().nonempty("Sugestão é obrigatória"),
});

export type CreateTogetherFormSchema = z.infer<typeof createTogetherFormSchema>
