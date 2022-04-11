import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { CommandInterface } from "../interface/CommandInterface";

export const ping: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pongs the user with BOT's current stats"),
  run: async (interact) => {
    const pingEmbed = new MessageEmbed()
      .setTitle(`CodyDev`)
      .setDescription(`Pong ${interact.user}🏓`)
      .setAuthor({
        name: interact.user.tag as string,
        iconURL: interact.user.displayAvatarURL() as string,
      })
      .setColor("RANDOM")
      .addFields(
        {
          name: "Websocket Heartbeat",
          value: interact.client.ws.ping.toString().concat("ms"),
        },
        {
          name: "Latency",
          value: (Date.now() - interact.createdTimestamp)
            .toString()
            .concat("ms"),
        }
      )
      .setTimestamp()
      .setFooter({ text: `Request by ${interact.user.tag}` });

    await interact.reply({ embeds: [pingEmbed] });
  },
};
