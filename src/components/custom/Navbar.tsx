import {
  BoxIcon,
  LayoutDashboardIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignoutBtn from "./SignoutBtn";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/home/inventory", label: "Inventory", icon: BoxIcon },
  { href: "/home/add-product", label: "Add Product", icon: PlusIcon },
  { href: "/home/settings", label: "Settings", icon: SettingsIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <aside className="bg-gray-900 text-white shrink-0  sticky top-0 h-screen w-48 flex flex-col  py-4 px-2 space-y-8">
      <div className="flex items-center space-x-2">
        <Link
          href="/home/dashboard"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="relative">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Analytics</h1>
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h1 className="text-xs font-bold text-gray-400">INVENTORY</h1>
          <div className="mt-2 flex flex-col space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  href={link.href}
                  key={link.label}
                  className={`px-2 py-2 rounded hover:bg-gray-200 hover:text-black flex items-center space-x-2 ${isActive ? "bg-gray-200 text-black" : ""}`}
                >
                  {<link.icon className="w-4 h-4" />}

                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <SignoutBtn />
        </div>
      </div>
    </aside>
  );
}
