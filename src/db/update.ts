import { Fluxer } from "@prisma/client";
import { prisma } from "../partials/prisma";
import { getFluxer } from "./get";

export const updateFluxer = async (id: string) => {
  const data = await getFluxer(id);
  let title = "Unknown Dev";
  const date = new Date(Date.now()).toISOString();

  if (data!.level >= 5) {
    title = "Noobie";
  }
  if (data!.level >= 10) {
    title = "Average Kid";
  }
  if (data!.level >= 20) {
    title = "Famous Picasso";
  }
  if (data!.level >= 30) {
    title = "Newton of Computers";
  }

  const updated = await prisma.fluxer.update({
    where: { discordId: data?.discordId },
    data: {
      score: data!.score >= 150 ? (data!.score = 0) : data!.score + 15,
      level: {
        increment: data!.score >= 150 ? 1 : 0,
      },
      noQuiz: {
        increment: 1,
      },
      title: title,
      updatedAt: date,
    },
  });

  return updated;
};

export const updateQuizNumber = async (id: string): Promise<Fluxer | null> => {
  const data = await prisma.fluxer.update({
    where: { discordId: id },
    data: {
      noQuiz: {
        increment: 1,
      },
    },
  });

  return data;
};

export const updateMonthly = async (
  id: string,
  stat: boolean
): Promise<Fluxer | null> => {
  const updatedData = await updateFluxer(id);

  const updated = await prisma.fluxer.update({
    where: { discordId: id },
    data: {
      monScore: {
        increment: stat === false ? 0 : 30,
      },
      round: {
        increment: updatedData!.noMonQuiz === 15 ? 1 : 0,
      },
      noMonQuiz:
        updatedData!.noMonQuiz === 15
          ? (updatedData!.noMonQuiz = 0)
          : updatedData!.noMonQuiz! + 1,
    },
  });

  return updated;
};
