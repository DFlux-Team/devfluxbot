"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invite = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.invite = {
    data: new builders_1.SlashCommandBuilder()
        .setName("invite")
        .setDescription("Creates an invite"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield interact.deferReply();
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
        const inviteEmbed = new discord_js_1.MessageEmbed()
            .setTitle("CodyDev")
            .setDescription("Thanks For Inviting me :)")
            .setURL(link)
            .setThumbnail((_a = interact.client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL())
            .setFooter({
            text: `Request by ${interact.user.tag}`,
            iconURL: interact.user.displayAvatarURL(),
        });
        yield interact.editReply({ embeds: [inviteEmbed] });
    }),
};
