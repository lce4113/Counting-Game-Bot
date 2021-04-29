import { Message } from "discord.js";
import { gameFilter } from "../Game/game-filter";
import { pingFilter } from "./ping";

export function filter(msg: Message) {
  gameFilter(msg);
  pingFilter(msg);
}