import FeatureCard from "@/components/custom/FeatureCard";
import { Button } from "@/components/ui/button";
import { stackServerApp } from "@/stack/server";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await stackServerApp.getUser(); // server-side user check
  if (user) redirect("/home");
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-gray-50 flex flex-col items-center justify-center text-center px-6">
      {/* Hero Section */}
      <section className="mt-16 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Simplify Your{" "}
          <span className="text-primary">Inventory Management</span>
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed">
          Manage your products, track stock levels, and gain real-time insights
          — all in one modern, powerful dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/sign-in">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 grid sm:grid-cols-3 gap-10 max-w-5xl">
        <FeatureCard
          title="Track Inventory"
          description="Easily add, edit, and monitor your products in real-time."
          icon="📦"
        />
        <FeatureCard
          title="Smart Insights"
          description="Gain data-driven analytics and reports about your stock levels."
          icon="📊"
        />
        <FeatureCard
          title="Team Collaboration"
          description="Allow multiple users to manage and update product data together."
          icon="🤝"
        />
      </section>

      {/* Footer */}
      <footer className="mt-24 text-gray-500 text-sm">
        © {new Date().getFullYear()} Inventory App — All rights reserved.
      </footer>
    </main>
  );
}
