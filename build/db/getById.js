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
exports.getById = void 0;
const prisma_1 = require("../partials/prisma");
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const details = (yield prisma_1.prisma.fluxer.findUnique({
        where: {
            discordId: id,
        },
    })) ||
        (yield prisma_1.prisma.fluxer.create({
            data: {
                discordId: id,
                level: 0,
                score: 0,
                title: "Unknown Dev",
                createdAt: Date.now().toString(),
                updatedAt: Date.now().toString(),
            },
        }));
    return details;
});
exports.getById = getById;
