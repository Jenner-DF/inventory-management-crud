export interface Product {
  id: string;
  userId: string;
  name: string;
  sku?: string | null;
  price: string; // Prisma Decimal comes as string
  quantity: number;
  lowStockThreshold?: number;
  isLowStock: boolean;
  createdAt: string; // serialized from server
  updatedAt: string;
}
// export interface BaseProduct {
//   name: string;
//   sku?: string | null;
//   price: string;
//   quantity: number;
//   lowStockThreshold?: number;
// }
// export interface ProductFormValues extends BaseProduct {
//   id: string;
// }

// export interface ProductCreateInput extends BaseProduct {
//   userId: string;
// }
