import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string({ required_error: "name tələb olunur" }).min(1, "name tələb olunur"),
  category: z.string({ required_error: "category tələb olunur" }).min(1, "category tələb olunur"),
  description: z.string().optional(),
  price: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
