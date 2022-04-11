import { Interaction } from "discord.js";
import { CommandList } from "../partials/CommandList";

export const Interacted = async (interact: Interaction) => {
  if (interact.isCommand()) {
    for (const command of CommandList) {
      if (interact.commandName === command.data.name) {
        await command.run(interact);
        break;
      }
    }
  }
};
