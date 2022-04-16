import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { CommandInterface } from "../interface/CommandInterface";

export const invite: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Creates an invite"),

  run: async (interact) => {
    await interact.deferReply();
    const link = interact.client.generateInvite({
      scopes: ["applications.commands", "bot"],
      permissions: [
        "MANAGE_MESSAGES",
        "MANAGE_ROLES",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "CREATE_INSTANT_INVITE",
        "MANAGE_EVENTS",
        "MODERATE_MEMBERS",
        "SEND_MESSAGES",
        "EMBED_LINKS",
        "MENTION_EVERYONE",
        "ADD_REACTIONS",
        "USE_APPLICATION_COMMANDS",
      ],
    });

    const inviteEmbed = new MessageEmbed()
      .setTitle("CodyDev")
      .setDescription("Thanks For Inviting me :)")
      .setURL(link as string)
      .setThumbnail(interact.client.user?.displayAvatarURL() as string)
      .setFooter({
        text: `Request by ${interact.user.tag}`,
        iconURL: interact.user.displayAvatarURL(),
      });

    await interact.editReply({ embeds: [inviteEmbed] });
  },
};
