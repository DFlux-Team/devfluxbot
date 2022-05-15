import { embed } from "../commands/embed";
import { help } from "../commands/help";
import { info } from "../commands/info";
import { lb } from "../commands/lb";
import { monthly } from "../commands/monthly";
import { ping } from "../commands/ping";
import { quiz } from "../commands/quiz";
import { quote } from "../commands/quote";
import { ram } from "../commands/ram";
import { register } from "../commands/register";
import { stats } from "../commands/stats";
import { CommandInterface } from "../interface/CommandInterface";

export const CommandList: CommandInterface[] = [
  ping,
  stats,
  help,
  quote,
  quiz,
  monthly,
  register,
  lb,
  embed,
  info,
  ram,
];
