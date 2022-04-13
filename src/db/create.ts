import type { Fluxer } from "@prisma/client";
import { prisma } from "../partials/prisma";

export const createFluxer = async (id: string) => {
  let date = new Date(Date.now()) as Date;
  const data: Fluxer = {
    discordId: id,
    level: 0,
    score: 0,
    thankrate: 0,
    title: "Unknown Dev",
    createdAt: date,
    updatedAt: date,
  };

  return await prisma.fluxer.create({ data: data });
};
