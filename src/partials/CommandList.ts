import { help } from "../commands/help";
import { ping } from "../commands/ping";
import { quote } from "../commands/quote";
import { stats } from "../commands/stats";
import { CommandInterface } from "../interface/CommandInterface";

export const CommandList: CommandInterface[] = [ping, stats, help, quote];
