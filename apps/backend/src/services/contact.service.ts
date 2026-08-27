import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { paginationMeta, type PaginationParams } from "../utils/pagination";
import type { CreateContactMessageInput } from "../validators/contact.schema";

export async function createMessage(input: CreateContactMessageInput) {
  return prisma.contactMessage.create({ data: input });
}

export async function listMessages(params: PaginationParams & { unreadOnly?: boolean }) {
  const where = {
    ...(params.unreadOnly ? { isRead: false } : {}),
    ...(params.search
      ? {
          OR: [
            { name: { contains: params.search, mode: "insensitive" as const } },
            { email: { contains: params.search, mode: "insensitive" as const } },
            { message: { contains: params.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [data, total] = await Promise.all([
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip: params.skip, take: params.limit }),
    prisma.contactMessage.count({ where }),
  ]);

  return { data, meta: paginationMeta(total, params) };
}

async function getMessageById(id: string) {
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) throw ApiError.notFound("Message not found");
  return message;
}

export async function markMessageRead(id: string) {
  await getMessageById(id);
  return prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
}

export async function markMessageUnread(id: string) {
  await getMessageById(id);
  return prisma.contactMessage.update({ where: { id }, data: { isRead: false } });
}

export async function deleteMessage(id: string) {
  await getMessageById(id);
  await prisma.contactMessage.delete({ where: { id } });
}
