// app/home/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/home/dashboard"); // immediately redirects

  return null; // optional, will never render
}
