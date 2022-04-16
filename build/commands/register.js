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
exports.register = void 0;
const builders_1 = require("@discordjs/builders");
const create_1 = require("../db/create");
exports.register = {
    data: new builders_1.SlashCommandBuilder()
        .setName("register")
        .setDescription("Register for all the events"),
    run: (interact) => __awaiter(void 0, void 0, void 0, function* () {
        yield interact.deferReply();
        const newUser = yield (0, create_1.createFluxer)(interact.user.id, interact.user.username);
        yield interact.editReply(`${newUser.username} has been registered successfully for all the events!`);
    }),
};
