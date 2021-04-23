import { Message } from "discord.js";

export function handleMsg(msg: Message) {
  console.log(msg.content);
}