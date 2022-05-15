"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandList = void 0;
const embed_1 = require("../commands/embed");
const help_1 = require("../commands/help");
const info_1 = require("../commands/info");
const lb_1 = require("../commands/lb");
const monthly_1 = require("../commands/monthly");
const ping_1 = require("../commands/ping");
const quiz_1 = require("../commands/quiz");
const quote_1 = require("../commands/quote");
const ram_1 = require("../commands/ram");
const register_1 = require("../commands/register");
const stats_1 = require("../commands/stats");
exports.CommandList = [
    ping_1.ping,
    stats_1.stats,
    help_1.help,
    quote_1.quote,
    quiz_1.quiz,
    monthly_1.monthly,
    register_1.register,
    lb_1.lb,
    embed_1.embed,
    info_1.info,
    ram_1.ram,
];
