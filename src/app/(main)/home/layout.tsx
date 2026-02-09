"use client";
import Navbar from "@/components/custom/Navbar";
import { useUser } from "@stackframe/stack";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const user = useUser();

  // Redirect to landing if not logged in
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex">
      <Navbar />
      <main className="flex-1 p-8 ">{children}</main>
    </div>
  );
}
