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
exports.help = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const CommandList_1 = require("../partials/CommandList");
exports.help = {
    data: new builders_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("Gets the available commands in the BOT"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const helpEmbed = new discord_js_1.MessageEmbed()
            .setTitle("CodyDev")
            .setDescription("Available commands in the BOT")
            .setColor("RANDOM")
            .setThumbnail((_a = interact.client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL())
            .setFooter({ text: `Request by ${interact.user.tag}` });
        CommandList_1.CommandList.forEach((cmd) => {
            helpEmbed.addField(cmd.data.name, cmd.data.description);
        });
        yield interact.reply({ embeds: [helpEmbed] });
    }),
};
