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
exports.getFluxer = void 0;
const prisma_1 = require("../partials/prisma");
const create_1 = require("./create");
const getFluxer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const details =
    //   (await prisma.fluxer.findUnique({
    //     where: {
    //       discordId: id,
    //     },
    //   })) ||
    //   (await prisma.fluxer.create({
    //     data: {
    //       discordId: id,
    //       level: 0,
    //       score: 0,
    //       title: "Unknown Dev",
    //       createdAt: Date.now().toString(),
    //       updatedAt: Date.now().toString(),
    //     },
    //   }));
    const data = yield prisma_1.prisma.fluxer.findUnique({
        where: { discordId: id },
    });
    if (!data) {
        return (0, create_1.createFluxer)(id);
    }
    return data;
});
exports.getFluxer = getFluxer;
