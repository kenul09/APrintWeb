import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string({ required_error: "Başlıq tələb olunur" }).min(1, "Başlıq tələb olunur"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
