import { z } from "zod";

export const ORDER_STATUSES = ["NEW", "IN_REVIEW", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

export const createOrderSchema = z.object({
  customerName: z.string({ required_error: "Müştəri adı tələb olunur" }).min(1, "Müştəri adı tələb olunur"),
  customerEmail: z.string({ required_error: "Email tələb olunur" }).email("Email formatı yanlışdır"),
  customerPhone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  amount: z.string().optional(),
  status: z.enum(ORDER_STATUSES).optional(),
});

export const updateOrderSchema = z.object({
  customerName: z.string().min(1).optional(),
  customerEmail: z.string().email("Email formatı yanlışdır").optional(),
  customerPhone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  amount: z.string().optional(),
  status: z.enum(ORDER_STATUSES).optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES, { required_error: "Status tələb olunur" }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
