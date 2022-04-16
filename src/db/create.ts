import { prisma } from "../partials/prisma";

export const createFluxer = async (id: string, username: string) => {
  const newFluxer = await prisma.fluxer.upsert({
    where: { discordId: id },
    update: {},
    create: {
      discordId: id,
      username: username,
      level: 0,
      score: 0,
      thankrate: 0,
      noQuiz: 0,
      noMonQuiz: 0,
      title: "Unknown Dev",
    },
  });

  return newFluxer;
};
