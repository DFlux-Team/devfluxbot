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
exports.updateMonthly = exports.updateQuizNumber = exports.updateFluxer = void 0;
const prisma_1 = require("../partials/prisma");
const get_1 = require("./get");
const updateFluxer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, get_1.getFluxer)(id);
    let title = "Unknown Dev";
    const date = new Date(Date.now()).toISOString();
    if (data.level >= 5) {
        title = "Noobie";
    }
    if (data.level >= 10) {
        title = "Average Kid";
    }
    if (data.level >= 20) {
        title = "Famous Picasso";
    }
    if (data.level >= 30) {
        title = "Newton of Computers";
    }
    const updated = yield prisma_1.prisma.fluxer.update({
        where: { discordId: data === null || data === void 0 ? void 0 : data.discordId },
        data: {
            score: data.score >= 150 ? (data.score = 0) : data.score + 15,
            level: {
                increment: data.score >= 150 ? 1 : 0,
            },
            noQuiz: {
                increment: 1,
            },
            title: title,
            updatedAt: date,
        },
    });
    return updated;
});
exports.updateFluxer = updateFluxer;
const updateQuizNumber = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.prisma.fluxer.update({
        where: { discordId: id },
        data: {
            noQuiz: {
                increment: 1,
            },
        },
    });
    return data;
});
exports.updateQuizNumber = updateQuizNumber;
const updateMonthly = (id, stat) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = yield (0, exports.updateFluxer)(id);
    const updated = yield prisma_1.prisma.fluxer.update({
        where: { discordId: id },
        data: {
            monScore: {
                increment: stat === false ? 0 : 30,
            },
            round: {
                increment: updatedData.noMonQuiz === 15 ? 1 : 0,
            },
            noMonQuiz: updatedData.noMonQuiz === 15
                ? (updatedData.noMonQuiz = 0)
                : updatedData.noMonQuiz + 1,
        },
    });
    return updated;
});
exports.updateMonthly = updateMonthly;
