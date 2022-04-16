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
exports.lb = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const get_1 = require("../db/get");
exports.lb = {
    data: new builders_1.SlashCommandBuilder()
        .setName("lb")
        .setDescription("Leaderboards of the server events"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        yield interact.deferReply();
        const ranklist = yield (0, get_1.getLeaderBoard)();
        const rankEmbed = new discord_js_1.MessageEmbed()
            .setTitle("Quiz Rank List")
            .setDescription("The Rank List for the Quizzes taken")
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter({
            text: `Request by ${interact.user.tag}`,
            iconURL: interact.user.displayAvatarURL(),
        });
        for (let i of ranklist) {
            rankEmbed.addField(`${ranklist.indexOf(i) + 1}. ${i.username} -- ${i.monScore} points`, "\u200B");
        }
        yield interact.editReply({ embeds: [rankEmbed] });
    }),
};
