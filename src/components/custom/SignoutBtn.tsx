"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/signout";
import { LogOutIcon } from "lucide-react";

export default function SignoutBtn() {
  return (
    <div className="mt-auto px-2">
      <h2 className="text-xs font-bold text-gray-400 mb-2">ACCOUNT</h2>
      <form action={signOutAction}>
        <Button
          type="submit"
          variant="ghost"
          className="cursor-pointer w-full justify-start gap-2 px-3 py-2 rounded hover:bg-gray-200 hover:text-black"
        >
          <LogOutIcon className="w-4 h-4" />
          <span>Sign out </span>
        </Button>
      </form>
    </div>
  );
}
