import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInterface } from "../interface/CommandInterface";

export const ram: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("ram")
    .setDescription("Gives the Ram usage of the bot"),

  run: async (interact) => {
    const usage = (process.memoryUsage().heapUsed / 1024 / 1024)
      .toFixed(2)
      .toString();

    await interact.reply(`The current Ram usage is: ${usage}`);
  },
};
