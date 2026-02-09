"use server";

import { stackServerApp } from "@/stack/server";

export async function signOutAction() {
  return stackServerApp.redirectToSignOut();
}
