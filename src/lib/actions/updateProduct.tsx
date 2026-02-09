import { toast } from "sonner";
import { ProductFormValues } from "../types/product";
import { prisma } from "../prisma";

export default function updateProduct(updatedProduct: ProductFormValues) {
  // const fakePromise = new Promise((resolve) => {
  //   setTimeout(() => resolve(updatedProduct), 1500);
  // });
  // return toast.promise(fakePromise, {
  //   loading: "Updating product...",
  //   success: "Product updated successfully",
  //   error: "Failed to update product",
  // });
  // toast.promise(
  //   {
  //     loading: "Updating product...",
  //     success: "Product updated successfully",
  //     error: "Failed to update product",
  //   },
  // );
}
