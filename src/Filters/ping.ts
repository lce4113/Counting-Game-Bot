import { Message } from "discord.js";
import { client } from "..";

export function pingFilter(msg: Message) {
  if (msg.mentions.has(client.user)) {
    msg.channel.send("<:ping:834497662517772299>");
  }
}