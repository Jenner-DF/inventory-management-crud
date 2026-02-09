import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import ProductChart from "@/components/custom/ProductChart";
import EfficiencyChart from "@/components/custom/EfficiencyChart";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;
  // const totalProducts = await getTotalProducts(userId);

  const [totalProducts, lowstock, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: { isLowStock: true, userId },
    }),
    prisma.product.findMany({
      where: { userId },
      select: {
        price: true,
        quantity: true,
        createdAt: true,
        lowStockThreshold: true,
      },
    }),
  ]);
  // const totalProducts = await prisma.product.count();

  // const lowstock = await prisma.product.count({
  //   where: { isLowStock: true },
  // });

  // const allProducts = await prisma.product.findMany({
  //   select: { price: true, quantity: true, createdAt: true },
  // });
  const totalValue = allProducts.reduce((acc, product) => {
    acc += Number(product.price) * Number(product.quantity);
    return acc;
  }, 0);

  const weeklyProductsData = [];

  for (let i = 0; i < 12; i++) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });
    weeklyProductsData.push({
      week: `${weekStart.toLocaleString("en-US", { month: "short" })} ${weekStart.getDate()}–${weekEnd.getDate()}`,
      products: weekProducts.length,
    });
  }
  const recents = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  // band-aid for getting lowstocks and out of stock
  const totalNoStocks = allProducts.filter(
    (product) => product.quantity === 0,
  ).length;

  const totalLowStocks = allProducts.filter(
    (product) =>
      product.quantity > 0 &&
      product.quantity <= (product.lowStockThreshold ?? 0),
  ).length;

  const totalInStocks = allProducts.filter(
    (product) => product.quantity > (product.lowStockThreshold ?? 0),
  ).length;

  return (
    <div>
      {/* <div>
        <h1>Dashboard</h1>
        <p>Total Products: {totalProducts}</p>
        <p>Total Value: ${totalValue}</p>
        <p>Low Stock: {lowstock}</p>
        <p>
          Recent :{" "}
          {recents.map((recent) => (
            <li key={recent.id}>{recent.name}</li>
          ))}
        </p>
      </div> */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your system.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
        {/* Key Metrics */}
        <Card className="row-span-1">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">{totalProducts}</h1>
              <p>Total Products</p>
              <div className="flex items-center justify-center text-xs text-green-600 mt-1">
                <span>+{totalProducts}</span>
                <TrendingUp className="w-3 h-3 text-green-500 ml-1"></TrendingUp>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">{totalValue}</h1>
              <p>Total Value</p>
              <div className="flex items-center justify-center text-xs text-green-600 mt-1">
                <span>+{totalValue}</span>
                <TrendingUp className="w-3 h-3 text-green-500 ml-1"></TrendingUp>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">{lowstock}</h1>
              <p>Low Stock</p>
              <div className="flex items-center justify-center text-xs text-green-600 mt-1">
                <span>+{lowstock}</span>
                <TrendingUp className="w-3 h-3 text-green-500 ml-1"></TrendingUp>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Inventory over time */}
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle> New products per week </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductChart data={weeklyProductsData.reverse()} />
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card className="row-span-3">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardAction>
              <Link
                href="/home/inventory"
                className="text-sm text-primary flex items-center justify-center hover:underline"
              >
                View All Products
                <ArrowRightCircle className="w-4 h-4 ml-1 text-primary" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="">
            <table className="w-full h-full table-auto">
              <thead>
                <tr>
                  <th className="text-left">Product Name</th>
                  <th className="text-left">Stock Level</th>
                  <th className="text-left">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {recents.map((product) => {
                  const stockLevel =
                    product.quantity === 0
                      ? "Out of Stock"
                      : product.isLowStock
                        ? "Low Stock"
                        : "In Stock";
                  const color =
                    stockLevel === "In Stock"
                      ? "text-green-500"
                      : stockLevel === "Low Stock"
                        ? "text-orange-500"
                        : "text-red-500";
                  return (
                    <tr key={product.id}>
                      <td className="py-2">{product.name}</td>
                      <td className={`py-2 font-semibold ${color}`}>
                        {stockLevel}
                      </td>
                      <td className="py-2">
                        {new Date(product.createdAt).toDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
        {/* Efficiency*/}
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle>Efficiency </CardTitle>
          </CardHeader>
          <CardContent>
            <EfficiencyChart
              totalInStock={totalInStocks}
              totalLowStock={totalLowStocks}
              totalNoStock={totalNoStocks}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
