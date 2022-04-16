import { Fluxer } from "@prisma/client";
import { prisma } from "../partials/prisma";

export const getFluxer = async (id: string): Promise<Fluxer | null> => {
  const gotUser = await prisma.fluxer.findUnique({
    where: { discordId: id },
  });

  if (!gotUser) return null;

  return gotUser;
};
