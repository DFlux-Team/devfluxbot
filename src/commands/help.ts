import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { CommandInterface } from "../interface/CommandInterface";
import { CommandList } from "../partials/CommandList";

export const help: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Gets the available commands in the BOT"),
  run: async (interact) => {
    const helpEmbed = new MessageEmbed()
      .setTitle("CodyDev")
      .setDescription("Available commands in the BOT")
      .setColor("RANDOM")
      .setThumbnail(interact.client.user?.displayAvatarURL() as string)
      .setFooter({ text: `Request by ${interact.user.tag}` });

    CommandList.forEach((cmd) => {
      helpEmbed.addField(cmd.data.name, cmd.data.description);
    });

    await interact.reply({ embeds: [helpEmbed] });
  },
};
