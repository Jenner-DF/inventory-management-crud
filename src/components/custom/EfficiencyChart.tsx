"use client";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Pie,
  Cell,
  PieChart,
  Tooltip,
  Legend,
} from "recharts";
function getStockStatus(value: number) {
  if (value > 50) {
    return { name: "In Stock", fill: "#22c55e" }; // green
  }
  if (value > 20) {
    return { name: "Low Stock", fill: "#f97316" }; // orange
  }
  return { name: "Critical Stock!", fill: "#ef4444" }; // red
}

export default function EfficiencyChart({
  totalInStock,
  totalLowStock,
  totalNoStock,
}: {
  totalInStock: number;
  totalLowStock: number;
  totalNoStock: number;
}) {
  const data = [
    { name: "In Stock", value: totalInStock, fill: "#4ac900" },
    { name: "Low Stock", value: totalLowStock, fill: "#ff970e" },
    { name: "Out of Stock", value: totalNoStock, fill: "#e01f1f" },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <PieChart
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "192px",
          maxHeight: "100%",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={data}
          innerRadius="80%"
          outerRadius="100%"
          cornerRadius="50%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        />
        <Tooltip />
        <Legend />
      </PieChart>{" "}
    </div>
  );
}

//  <RadialBarChart
//     width={250}
//     height={250}
//     cx="50%"
//     cy="50%"
//     innerRadius="70%"
//     outerRadius="100%"
//     barSize={15}
//     data={data}
//     startAngle={90}
//     endAngle={-270}
//   >
//     <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

//     <RadialBar dataKey="value" cornerRadius={10} />

//     {/* Center text */}
//     <text
//       x="50%"
//       y="50%"
//       textAnchor="middle"
//       dominantBaseline="middle"
//       className="text-2xl font-bold fill-gray-900"
//     >
//       {value}%
//     </text>

//     <text
//       x="50%"
//       y="60%"
//       textAnchor="middle"
//       dominantBaseline="middle"
//       className="text-sm fill-gray-500"
//     >
//       {status.name}
//     </text>
//   </RadialBarChart>
