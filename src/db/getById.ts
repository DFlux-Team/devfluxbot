import { prisma } from "../partials/prisma";

export const getById = async (id: string) => {
  const details =
    (await prisma.fluxer.findUnique({
      where: {
        discordId: id,
      },
    })) ||
    (await prisma.fluxer.create({
      data: {
        discordId: id,
        level: 0,
        score: 0,
        title: "Unknown Dev",
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      },
    }));

  return details;
};
