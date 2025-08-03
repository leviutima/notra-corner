import z from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.string().email('Insira um email válido').nonempty('Email é obrigatório')
})

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>