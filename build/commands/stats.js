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
exports.stats = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const get_1 = require("../db/get");
exports.stats = {
    data: new builders_1.SlashCommandBuilder()
        .setName("stats")
        .setDescription("Current stats of the user"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        yield interact.deferReply();
        const userInfo = yield (0, get_1.getFluxer)(interact.user.id);
        if (!userInfo) {
            yield interact.editReply(`User with ID ${interact.user.id} is not present in the Database.\nKindly run the \`/register\` command to register yourself.`);
        }
        else {
            const statsEmbed = new discord_js_1.MessageEmbed()
                .setTitle(interact.user.username.concat("'s Profile"))
                .setDescription(`Here are the stats of the user`)
                .setColor("RANDOM")
                .setAuthor({
                name: interact.user.tag,
                iconURL: interact.user.displayAvatarURL(),
            })
                .setThumbnail(interact.user.displayAvatarURL())
                .addFields({
                name: "Name",
                value: userInfo.username,
            }, {
                name: "Title",
                value: userInfo.title,
            }, {
                name: "Current Score",
                value: userInfo.score.toString(),
            }, {
                name: "Current Level",
                value: userInfo.level.toString(),
            }, {
                name: "No. of Quizzes Taken",
                value: (_a = userInfo.noQuiz) === null || _a === void 0 ? void 0 : _a.toString(),
            }, {
                name: "Thank Rate",
                value: (_b = userInfo.thankrate) === null || _b === void 0 ? void 0 : _b.toString(),
            }, {
                name: "Fluxer Since",
                value: (_c = userInfo.createdAt) === null || _c === void 0 ? void 0 : _c.toDateString(),
            }, {
                name: "Last Profile Update",
                value: (_d = userInfo.updatedAt) === null || _d === void 0 ? void 0 : _d.toTimeString(),
            })
                .setFooter({
                text: `Request by ${interact.user.tag}`,
                iconURL: interact.user.displayAvatarURL(),
            })
                .setTimestamp();
            yield interact.editReply({
                embeds: [statsEmbed],
            });
        }
    }),
};
