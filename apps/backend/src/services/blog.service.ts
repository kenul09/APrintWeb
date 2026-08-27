import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { slugify } from "../utils/slugify";
import { paginationMeta, type PaginationParams } from "../utils/pagination";
import type { CreateBlogPostInput, UpdateBlogPostInput } from "../validators/blog.schema";

async function uniqueSlugFrom(title: string, ignoreId?: string): Promise<string> {
  const base = slugify(title) || "post";
  let candidate = base;
  let attempt = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === ignoreId) return candidate;
    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
}

export async function listPosts(params: PaginationParams & { publishedOnly?: boolean }) {
  const where = {
    ...(params.publishedOnly ? { isPublished: true } : {}),
    ...(params.search
      ? { title: { contains: params.search, mode: "insensitive" as const } }
      : {}),
  };

  const [data, total] = await Promise.all([
    prisma.blogPost.findMany({ where, orderBy: { createdAt: "desc" }, skip: params.skip, take: params.limit }),
    prisma.blogPost.count({ where }),
  ]);

  return { data, meta: paginationMeta(total, params) };
}

export async function getPostById(id: string) {
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) throw ApiError.notFound("Blog post not found");
  return post;
}

export async function createPost(input: CreateBlogPostInput) {
  const slug = await uniqueSlugFrom(input.title);
  return prisma.blogPost.create({
    data: {
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      image: input.image,
      isPublished: input.isPublished ?? false,
      slug,
    },
  });
}

export async function updatePost(id: string, input: UpdateBlogPostInput) {
  await getPostById(id);
  const data: Record<string, unknown> = { ...input };
  if (input.title) data.slug = await uniqueSlugFrom(input.title, id);
  return prisma.blogPost.update({ where: { id }, data });
}

export async function deletePost(id: string) {
  await getPostById(id);
  await prisma.blogPost.delete({ where: { id } });
}
