"use client";

import { useTotalProducts } from "@/lib/hooks/useProducts";

export default function DashboardClient() {
  const { data, isLoading } = useTotalProducts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* <div className="flex-1 h-screen w-screen bg-gray-800"> */}
      <div>
        <h1>Total Products tite: {data}</h1>
      </div>
    </div>
  );
}
