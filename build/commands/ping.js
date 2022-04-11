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
exports.ping = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.ping = {
    data: new builders_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pongs the user with BOT's current stats"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        const pingEmbed = new discord_js_1.MessageEmbed()
            .setTitle(`CodyDev`)
            .setDescription(`Pong ${interact.user}🏓`)
            .setAuthor({
            name: interact.user.tag,
            iconURL: interact.user.displayAvatarURL(),
        })
            .setColor("RANDOM")
            .addFields({
            name: "Websocket Heartbeat",
            value: interact.client.ws.ping.toString().concat("ms"),
        }, {
            name: "Latency",
            value: (Date.now() - interact.createdTimestamp)
                .toString()
                .concat("ms"),
        })
            .setTimestamp()
            .setFooter({ text: `Request by ${interact.user.tag}` });
        yield interact.reply({ embeds: [pingEmbed] });
    }),
};
