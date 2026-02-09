"use server";
import { prisma } from "@/lib/prisma";
import {
  ProductCreateInput,
  ProductFormValues,
} from "../schema/product.schema";

export async function getTotalProducts(userId: string) {
  return prisma.product.count({ where: { userId } });
}
export async function getAllProducts(userId: string) {
  const products = await prisma.product.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
  // convert Decimal to string
  return products.map((p) => ({
    ...p,
    price: p.price.toString(), // <-- convert Decimal to string
  }));
}

export async function createProduct(newProduct: ProductCreateInput) {
  await prisma.product.create({ data: newProduct });
}

export async function updateProduct(updatedProduct: ProductFormValues) {
  await prisma.product.update({
    where: { id: updatedProduct.id },
    data: {
      name: updatedProduct.name,
      sku: updatedProduct.sku,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
      lowStockThreshold: updatedProduct.lowStockThreshold,
    },
  });
}
export async function deleteSelectedProduct(id: ProductFormValues["id"]) {
  await prisma.product.deleteMany({
    where: {
      id,
    },
  });
}
export async function deleteAllSelectedProducts(rows: ProductFormValues[]) {
  await prisma.product.deleteMany({
    where: {
      id: {
        in: rows.map((row) => row.id),
      },
    },
  });
}
