import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import type { CreateContactMessageInput } from "../validators/contact.schema";

export async function createMessage(input: CreateContactMessageInput) {
  return prisma.contactMessage.create({ data: input });
}

export async function listMessages() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
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

export async function deleteMessage(id: string) {
  await getMessageById(id);
  await prisma.contactMessage.delete({ where: { id } });
}
