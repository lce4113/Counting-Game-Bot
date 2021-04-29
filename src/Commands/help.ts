import { Message } from "discord.js";
import { Options } from "../options";
import { SKY_BLUE } from "../Utils/colors";
import { createEmbed } from "../Utils/embed";

const LINK = "https://docs.google.com/document/d/1bYiS2M9tNx9gX3lRnczrVkyoA34KRplxByFoH2vbkUw/edit?usp=sharing";

export function run(msg: Message, params: string[]) {
  const embed = createEmbed({
    title: "Welcome To The Counting Game!",
    description: `For detailed rules, go [here](${LINK}).`,
    color: SKY_BLUE
  });
  msg.channel.send({ embed });
};

export const options: Options = {
  regex: "$help",
  example: "$help",
  description: "A general help section",
  aliases: [
    {
      regex: "$h",
      example: "$h"
    }
  ]
};