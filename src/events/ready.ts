import { REST } from "@discordjs/rest";
import { Client } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { CommandList } from "../partials/CommandList";

export const Ready = async (bot: Client) => {
  bot.user?.setActivity(`/help on ${bot.guilds.cache.size} servers`, {
    type: "PLAYING",
  });
  const rest = new REST({ version: "9" }).setToken(
    process.env["TOKEN"] as string
  );

  const commandsData = CommandList.map((cmd) => cmd.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(
      bot.user?.id || "missing id",
      process.env["GUILD"] as string
    ),
    {
      body: commandsData,
    }
  );

  // await rest.put(Routes.applicationCommands(bot.user?.id as string), {
  //   body: commandsData,
  // });
  console.log("[BOT] Commands Registered and BOT started 🚀");
};
