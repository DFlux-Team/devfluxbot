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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quiz = void 0;
const builders_1 = require("@discordjs/builders");
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const get_1 = require("../db/get");
const update_1 = require("../db/update");
exports.quiz = {
    data: new builders_1.SlashCommandBuilder()
        .setName("quiz")
        .setDescription("A Fun Quiz to play"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield interact.deferReply();
        const { data } = yield axios_1.default.get("https://quizapi.io/api/v1/questions", {
            headers: {
                "X-Api-Key": process.env["API_KEY"],
            },
        });
        let res = data[Math.floor(Math.random() * data.length)];
        const quizEmbed = new discord_js_1.MessageEmbed()
            .setTitle(`Quiz Time for ${interact.user.username}`)
            .setDescription(res.question)
            .setAuthor({
            name: interact.user.tag,
            iconURL: interact.user.displayAvatarURL(),
        })
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter({
            text: `Request by ${interact.user.tag}`,
            iconURL: interact.user.displayAvatarURL(),
        });
        const filter = (ch) => {
            return ch.author.id === interact.user.id;
        };
        const opts = Object.values(res.answers).filter((x) => x);
        const correctOpts = Object.values(res.correct_answers);
        let answerPos = 0;
        for (let i = 0; i < opts.length; i++) {
            quizEmbed.addField((_a = `${i + 1}. ${opts[i]}`) !== null && _a !== void 0 ? _a : "no option", "\u200B");
        }
        for (let x = 0; x < correctOpts.length; x++) {
            if (correctOpts[x] === "true")
                answerPos = x;
            else
                continue;
        }
        let finalAnswer = opts[answerPos];
        const user = yield (0, get_1.getFluxer)(interact.user.id);
        const message = (yield interact.editReply({
            embeds: [quizEmbed],
        }));
        message.channel
            .awaitMessages({
            filter,
            max: 1,
            time: 15 * 1000,
            errors: ["time"],
        })
            .then((m) => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c;
            m = m.first();
            console.log("Entering conditions");
            if (m.content.toLowerCase() === (answerPos + 1).toString()) {
                console.log("Starting update");
                const update = yield (0, update_1.updateFluxer)(user.discordId);
                quizEmbed.addFields({ name: "Correct Answer", value: finalAnswer }, {
                    name: "Current Score",
                    value: (_b = update.score.toString()) !== null && _b !== void 0 ? _b : "0",
                });
                interact.editReply({ embeds: [quizEmbed] });
                console.log("update complete");
                interact.followUp("Do you eat Brains for Breakfast?👀\nBecause you are correct 💐👍");
                // for adding points
            }
            else {
                yield (0, update_1.updateQuizNumber)(user.discordId);
                quizEmbed.addFields({ name: "Correct Answer", value: finalAnswer }, {
                    name: "Current Score",
                    value: (_c = user.score.toString()) !== null && _c !== void 0 ? _c : "0",
                });
                interact.editReply({ embeds: [quizEmbed] });
                interact.followUp(`💔Wrong Answer! Better Luck next time 🙌`);
            }
        }))
            .catch((e) => {
            quizEmbed.addField("Correct Answer", finalAnswer);
            interact.editReply({ embeds: [quizEmbed] });
            interact.followUp(`❌ No one answered the question!`);
        });
    }),
};
