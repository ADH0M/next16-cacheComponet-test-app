import prisma from "../db/prisma";

export async function getCategoryOptions() {
  return prisma.category.findMany({
    select: { id: true, name: true },
    
  });
}
