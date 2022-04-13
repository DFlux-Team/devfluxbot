import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { getFluxer } from "../db/get";
import { CommandInterface } from "../interface/CommandInterface";

export const stats: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Current stats of the user"),

  run: async (interact) => {
    const userInfo = await getFluxer(interact.user.id);

    const statsEmbed = new MessageEmbed()
      .setTitle(interact.user.username.concat("'s Profile"))
      .setDescription(`Here are the stats of the user`)
      .setColor("RANDOM")
      .setAuthor({
        name: interact.user.tag as string,
        iconURL: interact.user.displayAvatarURL() as string,
      })
      .setThumbnail(interact.user.displayAvatarURL() as string)
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
        },
        {
          name: "Current Level",
          value: userInfo.level.toString(),
        },
        {
          name: "Thank Rate",
          value: userInfo.thankrate?.toString() as string,
        },
        {
          name: "Fluxer Since",
          value: userInfo.createdAt?.toDateString() as string,
        },
        {
          name: "Last Profile Update",
          value: userInfo.updatedAt?.toTimeString() as string,
        }
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
