import { SlashCommandBuilder } from "@discordjs/builders";
import { createFluxer } from "../db/create";
import { CommandInterface } from "../interface/CommandInterface";

export const register: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register for all the events"),

  run: async (interact) => {
    await interact.deferReply();
    const newUser = await createFluxer(
      interact.user.id,
      interact.user.username
    );
    await interact.editReply(
      `${newUser.username} has been registered successfully for all the events!`
    );
  },
};
