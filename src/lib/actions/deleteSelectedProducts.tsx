import { toast } from "sonner";
import { prisma } from "../prisma";
import { ProductFormValues } from "../types/product";

export default async function deleteAllSelectedProducts(
  rows: ProductFormValues[],
) {
  const fakePromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ count: rows.length });
    }, 1500);
  });

  return toast.promise(fakePromise, {
    loading: "Deleting selected rows...",
    success: `Successfully deleted ${rows.length} row(s)`,
    error: "Failed to delete rows",
  });
}
// export default async function deleteSelectedRows(rows: ProductFormValues[]) {
//   return toast.promise(
//     prisma.product.deleteMany({
//       where: {
//         id: {
//           in: rows.map((row) => row.id),
//         },
//       },
//     }),
//     {
//       loading: "Deleting selected rows...",
//       success: `Successfully deleted ${rows.length} row(s)`,
//       error: "Failed to delete rows",
//     },
//   );
// }
