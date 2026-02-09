"use client";

import { useQuery } from "@tanstack/react-query";
import { getTotalProducts } from "../actions/actions";

export function useTotalProducts() {
  return useQuery({
    queryKey: ["total-products"],
    queryFn: async () => getTotalProducts(), //cant call prisma directly in client component
  });
}
