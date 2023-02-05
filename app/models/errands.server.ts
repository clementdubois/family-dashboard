import { prisma } from "~/db.server";

export function getErrandsList() {
  return prisma.errandItem.findMany();
}
