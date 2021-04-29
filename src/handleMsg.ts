import { Message } from "discord.js";
import { Command, commands, Subcommand } from "./commands";
import { prefix } from "./options.json";
import { Alias, Options } from "./options";
import { createEmbed } from "./Utils/embed";

type commandExports = {
  readonly options: Options;
  run(msg: Message, params: string[]): Promise<void>;
};

async function checkSubcommand(
  msg: Message,
  subcommand: Subcommand,
  subPath: string
) {

  const { title, file, subcommands } = subcommand;
  const { options, run }: commandExports = await import("./Commands/" + subPath + file);
  const { aliases, permission } = options;
  const [msgCommand, ...params] = msg.content.split(/\s+/);

  const mainAlias: Alias = { example: options.example, regex: options.regex };
  for (const alias of [mainAlias, ...aliases]) {

    const parsedRegex = alias.regex.replace(/\$/g, prefix);
    const regex = new RegExp(parsedRegex);
    if (regex.test(msgCommand)) {

      // Check permissions
      if (permission && msg.member.hasPermission(permission)) {
        const embed = createEmbed({
          title: "Permissions Missing",
          title_icon: msg.author.avatarURL(),
          description: `Sorry, the \`${permission}\` permission is necessary to run the "${title}" command.`
        });
        await msg.channel.send({ embed });
        return;
      }

      // Check if command is subcommand
      for (const subcommand of subcommands) {
        await checkSubcommand(msg, subcommand, subPath + file);
      }

      await run(msg, params);
      return;

    }
  }

}

export async function handleMsg(msg: Message) {
  for (const command of commands) {

    const { title, file, subcommands } = command;
    let filePath: string;
    if (subcommands) filePath = `./Commands/${file}/index.ts`;
    else filePath = `./Commands/${file}.ts`;
    const { options, run }: commandExports = await import(filePath);
    const { aliases, permission } = options;
    const [msgCommand, ...params] = msg.content.split(/\s+/);

    const mainAlias: Alias = { example: options.example, regex: options.regex };
    for (const alias of [mainAlias, ...aliases]) {

      const parsedRegex = alias.regex.replace(/\$/g, prefix);
      const regex = new RegExp(parsedRegex);
      if (regex.test(msgCommand)) {

        // Check permissions
        if (permission && msg.member.hasPermission(permission)) {
          const embed = createEmbed({
            title: "Permissions Missing",
            title_icon: msg.author.avatarURL(),
            description: `Sorry, the \`${permission}\` permission is necessary to run the "${title}" command.`
          });
          msg.channel.send({ embed });
          return;
        }

        // Check if command is subcommand
        if (subcommands) {
          for (const subcommand of subcommands) {
            checkSubcommand(msg, subcommand, file);
          }
        }

        await run(msg, params);
        return;

      }

    }
  }
}