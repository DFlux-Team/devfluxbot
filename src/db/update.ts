import { prisma } from "../partials/prisma";
import { getFluxer } from "./get";

export const updateFluxer = async (id: string) => {
  const data = await getFluxer(id);

  if (data.score > 150) {
    await prisma.fluxer.update({
      where: { discordId: id },
      data: { score: 0, level: data.level + 1 },
    });
  }

  let title = data.title;

  if (data.level >= 5) {
    title = "Noobie";
  }
  if (data.level >= 10) {
    title = "Average Kid";
  }
  if (data.level >= 20) {
    title = "Famous Picasso";
  }
  if (data.level >= 30) {
    title = "Newton of Computers";
  }

  await prisma.fluxer.update({
    where: {
      discordId: id,
    },
    data: {
      title: title,
      updatedAt: Date.now().toString(),
    },
  });

  const details = await prisma.fluxer.findUnique({
    where: {
      discordId: id,
    },
  });

  return details;
};
