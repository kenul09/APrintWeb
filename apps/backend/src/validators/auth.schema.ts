import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email tələb olunur" }).email("Email formatı yanlışdır"),
  password: z.string({ required_error: "Şifrə tələb olunur" }).min(1, "Şifrə tələb olunur"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string({ required_error: "Ad Soyad tələb olunur" }).min(1, "Ad Soyad tələb olunur"),
  email: z.string({ required_error: "Email tələb olunur" }).email("Email formatı yanlışdır"),
  password: z
    .string({ required_error: "Şifrə tələb olunur" })
    .min(8, "Şifrə ən azı 8 simvol olmalıdır"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
