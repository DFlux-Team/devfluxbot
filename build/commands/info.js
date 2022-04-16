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
exports.info = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.info = {
    data: new builders_1.SlashCommandBuilder()
        .setName("info")
        .setDescription("Returns the BOT information"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const infoEmbed = new discord_js_1.MessageEmbed()
            .setTitle("CodyDev")
            .setDescription("I am a BOT helping developers in [DevFlux](https://discord.gg/He5wjTwVSr) server!")
            .setColor("RANDOM")
            .addFields({
            name: "Server Count",
            value: interact.client.guilds.cache.size.toString(),
            inline: true,
        }, {
            name: "Source Code",
            value: "[GitHub Source](https://github.com/DFlux-Team/devfluxbot)",
            inline: true,
        })
            .setThumbnail((_a = interact.client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL())
            .setTimestamp()
            .setFooter({
            text: `Request by ${interact.user.tag}`,
            iconURL: interact.user.displayAvatarURL(),
        });
        yield interact.reply({ embeds: [infoEmbed] });
    }),
};
