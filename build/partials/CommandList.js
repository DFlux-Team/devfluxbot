"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandList = void 0;
const help_1 = require("../commands/help");
const monthly_1 = require("../commands/monthly");
const ping_1 = require("../commands/ping");
const quiz_1 = require("../commands/quiz");
const quote_1 = require("../commands/quote");
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
];
