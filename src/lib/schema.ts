import * as z from "zod";


export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().int().nonnegative(),
  categoryId: z.string().optional(),
  mainImageUrl: z.string().optional().or(z.literal("")),
  tags: z.string().optional(),
});
