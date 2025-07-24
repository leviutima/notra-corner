import z from "zod";

export const createChecklistFormSchema = z.object({
  title: z.string().nonempty("Título é obrigatório"),
  finished: z.boolean()
})

export type CreateChecklistFormSchema = z.infer<typeof createChecklistFormSchema>;