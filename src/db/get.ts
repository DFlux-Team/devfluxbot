import { Fluxer } from "@prisma/client";
import { prisma } from "../partials/prisma";

export const getFluxer = async (id: string): Promise<Fluxer | null> => {
  const gotUser = await prisma.fluxer.findUnique({
    where: { discordId: id },
  });

  if (!gotUser) return null;

  return gotUser;
};

export const getLeaderBoard = async () => {
  const gotLead = await prisma.fluxer.findMany({
    take: 5,
    orderBy: {
      monScore: "desc",
    },
  });

  return gotLead;
};
