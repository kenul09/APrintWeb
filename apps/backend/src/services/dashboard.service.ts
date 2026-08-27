import { prisma } from "../lib/prisma";

const RECENT_TAKE = 5;

export async function getStats() {
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalBlogPosts,
    unreadMessages,
    recentOrders,
    recentCustomers,
    recentMessages,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.customer.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: RECENT_TAKE,
      include: { customer: true },
    }),
    prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      take: RECENT_TAKE,
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: RECENT_TAKE,
    }),
  ]);

  return {
    totals: {
      products: totalProducts,
      orders: totalOrders,
      customers: totalCustomers,
      blogPosts: totalBlogPosts,
      unreadMessages,
    },
    recentOrders,
    recentCustomers,
    recentMessages,
  };
}
