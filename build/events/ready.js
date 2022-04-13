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
exports.Ready = void 0;
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const CommandList_1 = require("../partials/CommandList");
const Ready = (bot) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const rest = new rest_1.REST({ version: "9" }).setToken(process.env["TOKEN"]);
    const commandsData = CommandList_1.CommandList.map((cmd) => cmd.data.toJSON());
    yield rest.put(v9_1.Routes.applicationGuildCommands(((_a = bot.user) === null || _a === void 0 ? void 0 : _a.id) || "missing id", process.env["GUILD"]), {
        body: commandsData,
    });
    // await rest.put(Routes.applicationCommands(process.env["CLIENT"] as string), {
    //   body: commandsData,
    // });
    console.log("[BOT] Commands Registered and BOT started 🚀");
});
exports.Ready = Ready;
