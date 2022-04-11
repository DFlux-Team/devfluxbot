import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { getById } from "../db/getById";
import { CommandInterface } from "../interface/CommandInterface";

export const stats: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Current stats of the user"),

  run: async (interact) => {
    const userInfo = await getById(interact.user.id);

    const statsEmbed = new MessageEmbed()
      .setTitle(interact.user.username.concat("'s Profile"))
      .setDescription(`Here are the stats of the user`)
      .setColor("RANDOM")
      .setAuthor({
        name: interact.user.tag as string,
        iconURL: interact.user.displayAvatarURL() as string,
      })
      .addFields(
        {
          name: "Name",
          value: interact.user.username as string,
        },
        {
          name: "Title",
          value: userInfo.title as string,
        },
        {
          name: "Current Score",
          value: userInfo.score.toString(),
        }
        // {
        //   name: "Last Profile Update",
        //   value: userInfo.updatedAt?.toString(),
        // }
      )
      .setFooter({
        text: `Request by ${interact.user.tag}`,
        iconURL: interact.user.displayAvatarURL() as string,
      })
      .setTimestamp();
    await interact.reply({
      embeds: [statsEmbed],
    });
  },
};
