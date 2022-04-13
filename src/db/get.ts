import { prisma } from "../partials/prisma";
import { createFluxer } from "./create";

export const getFluxer = async (id: string) => {
  // const details =
  //   (await prisma.fluxer.findUnique({
  //     where: {
  //       discordId: id,
  //     },
  //   })) ||
  //   (await prisma.fluxer.create({
  //     data: {
  //       discordId: id,
  //       level: 0,
  //       score: 0,
  //       title: "Unknown Dev",
  //       createdAt: Date.now().toString(),
  //       updatedAt: Date.now().toString(),
  //     },
  //   }));

  const data = await prisma.fluxer.findUnique({
    where: { discordId: id },
  });

  if (!data) {
    return createFluxer(id);
  }

  return data;
};
