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
exports.updateFluxer = void 0;
const prisma_1 = require("../partials/prisma");
const get_1 = require("./get");
const updateFluxer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, get_1.getFluxer)(id);
    if (data.score > 150) {
        yield prisma_1.prisma.fluxer.update({
            where: { discordId: id },
            data: { score: 0, level: data.level + 1 },
        });
    }
    let title = data.title;
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
    yield prisma_1.prisma.fluxer.update({
        where: {
            discordId: id,
        },
        data: {
            title: title,
            updatedAt: Date.now().toString(),
        },
    });
    const details = yield prisma_1.prisma.fluxer.findUnique({
        where: {
            discordId: id,
        },
    });
    return details;
});
exports.updateFluxer = updateFluxer;
