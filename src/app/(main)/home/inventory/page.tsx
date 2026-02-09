import { prisma } from "@/lib/prisma";
import { DataTable } from "./table-data";
import { getCurrentUser } from "@/lib/auth";
import { columns } from "./columns";
import { getAllProducts } from "@/lib/actions/actions";

export default async function InventoryPage() {
  const user = await getCurrentUser();
  const userId = user.id;
  const data = await getAllProducts(userId);
  const dataMapped = data.map((item) => ({
    ...item,
    price: item.price.toString(),
  }));
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <p className="text-gray-600">Manage all your products.</p>
      </div>
      <DataTable columns={columns} userId={userId} />
    </div>
  );
}
