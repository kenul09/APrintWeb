import { z } from "zod";

export const createPortfolioSchema = z.object({
  title: z.string({ required_error: "title tələb olunur" }).min(1, "title tələb olunur"),
  category: z.string({ required_error: "category tələb olunur" }).min(1, "category tələb olunur"),
  image: z.string({ required_error: "image tələb olunur" }).min(1, "image tələb olunur"),
  description: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export const updatePortfolioSchema = createPortfolioSchema.partial();

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
