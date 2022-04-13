"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandList = void 0;
const help_1 = require("../commands/help");
const ping_1 = require("../commands/ping");
const quote_1 = require("../commands/quote");
const stats_1 = require("../commands/stats");
exports.CommandList = [ping_1.ping, stats_1.stats, help_1.help, quote_1.quote];
