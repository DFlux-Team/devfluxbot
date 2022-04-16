import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { getLeaderBoard } from "../db/get";
import { CommandInterface } from "../interface/CommandInterface";

export const lb: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("lb")
    .setDescription("Leaderboards of the server events"),

  run: async (interact) => {
    await interact.deferReply();
    const ranklist = await getLeaderBoard();

    const rankEmbed = new MessageEmbed()
      .setTitle("Quiz Rank List")
      .setDescription("The Rank List for the Quizzes taken")
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: `Request by ${interact.user.tag}`,
        iconURL: interact.user.displayAvatarURL(),
      });

    for (let i of ranklist) {
      rankEmbed.addField(
        `${ranklist.indexOf(i) + 1}. ${i.username} -- ${
          i.monScore
        } points` as string,
        "\u200B"
      );
    }

    await interact.editReply({ embeds: [rankEmbed] });
  },
};
