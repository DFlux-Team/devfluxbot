import { REST } from "@discordjs/rest";
import { Client } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { CommandList } from "../partials/CommandList";

export const Ready = async (bot: Client) => {
  const rest = new REST({ version: "9" }).setToken(
    process.env["TOKEN"] as string
  );

  const commandsData = CommandList.map((cmd) => cmd.data.toJSON());

  await rest.put(Routes.applicationCommands(bot.user?.id || "missing id"), {
    body: commandsData,
  });
  console.log("[BOT] Commands Registered and BOT started 🚀");
};
