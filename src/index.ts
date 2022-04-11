import { Client, Intents } from "discord.js";
import { Interacted } from "./events/interact";
import { Ready } from "./events/ready";

(async () => {
  const bot = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  });

  bot.on("ready", async () => await Ready(bot));
  bot.on("interactionCreate", async (action) => await Interacted(action));

  await bot.login(process.env["TOKEN"]);
})();
