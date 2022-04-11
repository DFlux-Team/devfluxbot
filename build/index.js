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
const discord_js_1 = require("discord.js");
const interact_1 = require("./events/interact");
const ready_1 = require("./events/ready");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const bot = new discord_js_1.Client({
        intents: [
            discord_js_1.Intents.FLAGS.GUILDS,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        ],
    });
    bot.on("ready", () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, ready_1.Ready)(bot); }));
    bot.on("interactionCreate", (action) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, interact_1.Interacted)(action); }));
    yield bot.login(process.env["TOKEN"]);
}))();
