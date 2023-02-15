import { prisma } from "~/db.server";
import type { ErrandItem } from "@prisma/client";

export function getErrandsList() {
  return prisma.errandItem.findMany();
}

export function addProduct({ item }: { item: ErrandItem["item"] }) {
  return prisma.errandItem.create({ data: { item } });
}
