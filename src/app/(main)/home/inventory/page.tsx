import { DataTable } from "./table-data";
import { getCurrentUser } from "@/lib/auth";
import { columns } from "./columns";

export default async function InventoryPage() {
  const user = await getCurrentUser();
  const userId = user.id;

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
