import { z } from "zod";

export const productBaseSchema = z.object({
  name: z.string().min(1).max(32),
  sku: z.string().optional(),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .refine((v) => Number(v) > 0),
  quantity: z.coerce.number().min(0).max(1_000_000),
  lowStockThreshold: z.coerce.number().min(0).max(1_000_000),
});

export type BaseProduct = z.infer<typeof productBaseSchema>;
export type ProductFormValues = BaseProduct & {
  id: string;
};

export interface ProductCreateInput extends BaseProduct {
  userId: string; //id of the user
}
