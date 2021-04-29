import { Message, MessageEmbed } from "discord.js";

export function createEmbed(params: {
  readonly msg?: Message;
  readonly title?: string;
  readonly author?: string;
  readonly title_icon?: string;
  readonly description?: string;
  readonly fields?: {
    readonly name: string;
    readonly value: string;
    readonly inline?: boolean;
  }[];
  readonly color?: string;
  readonly thumbnail?: string;
  readonly footer?: boolean;
}): MessageEmbed {

  // Deconstruct "options"
  const {
    msg,
    title = "",
    author = "",
    title_icon = "",
    description = "",
    fields = [],
    color = "",
    thumbnail = "",
    footer = false
  } = params;

  // Main embed
  const embed = new MessageEmbed();

  // Set Title and/or Author
  if (title_icon && !author) {
    embed.setAuthor(title, title_icon);
  } else {
    embed.setTitle(title);
    embed.setAuthor(author, title_icon);
  }

  // Description
  embed.setDescription(description);

  // Fields
  for (const field of fields) {
    embed.addField(field.name, field.value, field.inline);
  }

  // Color
  const decimalColor = parseInt(color, 16);
  embed.setColor(decimalColor);

  // Thumbnail
  embed.setThumbnail(thumbnail);

  // Footer (Requested by...)
  if (footer && !msg) {
    const errorMsg = "`footer` was set to true, but `msg` was not given.";
    throw new ReferenceError(errorMsg);
  }
  if (footer) {
    embed.setFooter(
      `Requested by **${msg.author.username}**`,
      msg.author.avatarURL()
    );
  }

  // Final embed
  return embed;

};