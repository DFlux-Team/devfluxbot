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
exports.createFluxer = void 0;
const prisma_1 = require("../partials/prisma");
const createFluxer = (id, username) => __awaiter(void 0, void 0, void 0, function* () {
    const newFluxer = yield prisma_1.prisma.fluxer.upsert({
        where: { discordId: id },
        update: {},
        create: {
            discordId: id,
            username: username,
            level: 0,
            monScore: 0,
            round: 1,
            score: 0,
            thankrate: 0,
            noQuiz: 0,
            noMonQuiz: 0,
            title: "Unknown Dev",
        },
    });
    return newFluxer;
});
exports.createFluxer = createFluxer;
