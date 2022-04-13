import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import { MessageEmbed } from "discord.js";
import { CommandInterface } from "../interface/CommandInterface";

export const quote: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Gives a random motivational quote to make your day"),

  run: async (interact) => {
    const { data } = await axios.get("https://zenquotes.io/api/random");

    const quoteEmbed = new MessageEmbed()
      .setTitle("Motivation Time!")
      .setDescription("Here's a quote that will motivate you")
      .setColor("RANDOM")
      .addField(`"_${data[0].q}_"` as string, `By - ${data[0].a}` as string)
      .setTimestamp()
      .setFooter({
        text: `Request by ${interact.user.tag}`,
        iconURL: interact.user.displayAvatarURL() as string,
      });

    await interact.reply({ embeds: [quoteEmbed] });
  },
};
