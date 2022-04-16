import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { CommandInterface } from "../interface/CommandInterface";

export const info: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Returns the BOT information"),

  run: async (interact) => {
    const infoEmbed = new MessageEmbed()
      .setTitle("CodyDev")
      .setDescription(
        "I am a BOT helping developers in [DevFlux](https://discord.gg/He5wjTwVSr) server!"
      )
      .setColor("RANDOM")
      .addFields(
        {
          name: "Server Count",
          value: interact.client.guilds.cache.size.toString(),
          inline: true,
        },
        {
          name: "Source Code",
          value: "[GitHub Source](https://github.com/DFlux-Team/devfluxbot)",
          inline: true,
        }
      )
      .setThumbnail(interact.client.user?.displayAvatarURL() as string)
      .setTimestamp()
      .setFooter({
        text: `Request by ${interact.user.tag}`,
        iconURL: interact.user.displayAvatarURL(),
      });

    await interact.reply({ embeds: [infoEmbed] });
  },
};
