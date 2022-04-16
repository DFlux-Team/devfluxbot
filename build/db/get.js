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
exports.getLeaderBoard = exports.getFluxer = void 0;
const prisma_1 = require("../partials/prisma");
const getFluxer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const gotUser = yield prisma_1.prisma.fluxer.findUnique({
        where: { discordId: id },
    });
    if (!gotUser)
        return null;
    return gotUser;
});
exports.getFluxer = getFluxer;
const getLeaderBoard = () => __awaiter(void 0, void 0, void 0, function* () {
    const gotLead = yield prisma_1.prisma.fluxer.findMany({
        take: 5,
        orderBy: {
            monScore: "desc",
        },
    });
    return gotLead;
});
exports.getLeaderBoard = getLeaderBoard;
