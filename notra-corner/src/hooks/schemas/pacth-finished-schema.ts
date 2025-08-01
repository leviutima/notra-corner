import z from "zod";

export const finishedActivititieFormSchema = z.object({
  finished: z.boolean()
})

export type FinishedActivitieFormSchema = z.infer<typeof finishedActivititieFormSchema>