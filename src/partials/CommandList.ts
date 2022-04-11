import { ping } from "../commands/ping";
import { stats } from "../commands/stats";
import { CommandInterface } from "../interface/CommandInterface";

export const CommandList: CommandInterface[] = [ping, stats];
