import z from "zod";

export const patchTitleChecklistFormSchema = z.object({
  title: z.string(),
})

export type PatchTitleChecklistFormSchema = z.infer<typeof patchTitleChecklistFormSchema>