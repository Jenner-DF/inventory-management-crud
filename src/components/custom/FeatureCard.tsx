import { Card, CardDescription, CardHeader } from "../ui/card";

export default function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Card className="rounded-2xl border bg-white shadow-sm p-6 hover:shadow-md transition">
      <CardHeader>
        <span className="sr-only">{title} Icon</span>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      </CardHeader>
      <CardDescription>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardDescription>
    </Card>
  );
}
