import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z.string({ required_error: "name tələb olunur" }).min(1, "name tələb olunur"),
  email: z.string({ required_error: "Email tələb olunur" }).email("Email düzgün formatda deyil."),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string({ required_error: "message tələb olunur" }).min(1, "message tələb olunur"),
});

export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>;
