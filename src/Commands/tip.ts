import { Message } from "discord.js";
import { Options } from "../options";
import { VIOLET } from "../Utils/colors";
import { createEmbed } from "../Utils/embed";
import * as tips from "./tips.json";

export function run(msg: Message) {
  const randIndex = Math.floor(Math.random() * tips.length);
  const tip = tips[randIndex];
  const embed = createEmbed({
    description: tip,
    color: VIOLET
  });
  msg.channel.send({ embed });
};

export const options: Options = {
  description: "Get a random tip",
  example: "$tip",
  regex: "$tip",
  aliases: [
    {
      example: "$t",
      regex: "$t"
    }
  ]
};