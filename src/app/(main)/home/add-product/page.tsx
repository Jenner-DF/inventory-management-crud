import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddProductClient from "./AddProductClient";

export default async function AddProductPage() {
  const user = await getCurrentUser();
  const userId = user.id;
  if (!user) redirect("/home/dashboard");
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <p className="text-gray-600">Add a new product to your inventory.</p>
      </div>
      <AddProductClient userId={userId} />
    </div>
  );
}
