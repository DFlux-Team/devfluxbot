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
exports.quote = void 0;
const builders_1 = require("@discordjs/builders");
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
exports.quote = {
    data: new builders_1.SlashCommandBuilder()
        .setName("quote")
        .setDescription("Gives a random motivational quote to make your day"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield axios_1.default.get("https://zenquotes.io/api/random");
        const quoteEmbed = new discord_js_1.MessageEmbed()
            .setTitle("Motivation Time!")
            .setDescription("Here's a quote that will motivate you")
            .setColor("RANDOM")
            .addField(`"_${data[0].q}_"`, `By - ${data[0].a}`)
            .setTimestamp()
            .setFooter({
            text: `Request by ${interact.user.tag}`,
            iconURL: interact.user.displayAvatarURL(),
        });
        yield interact.reply({ embeds: [quoteEmbed] });
    }),
};
