import { finished } from "stream";
import z from "zod";

export const createChecklistFormSchema = z.object({
  title: z.string().nonempty("Título é obrigatório"),
  finished: z.boolean().default(false)
})

export type CreateChecklistFormSchema = z.infer<typeof createChecklistFormSchema>