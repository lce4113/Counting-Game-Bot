import * as Discord from "discord.js";
import { argv } from "process";
import * as keys from "../keys.json";
import { filter } from "./Filters";
import { handleMsg } from "./handleMsg";
import { BOLD_GREEN, RESET, YELLOW } from "./Utils/asciiColors";
import { createEmbed } from "./Utils/embed";

console.log(`\n${YELLOW}(3) Program running...${RESET}`);

const client = new Discord.Client();

const TESTING = (argv[2] === "test");

client.on("ready", () => {
  console.log(`\n${YELLOW}(1) Connected as ${BOLD_GREEN}${client.user.tag}${YELLOW}!${RESET}\n`);
  // Set bot status to "Listening To "&help""
  client.user.setPresence({
    status: "online",
    activity: {
      name: "To \"&help\"",
      type: "LISTENING"
    }
  });
});

client.on("message", async msg => {
  if (msg.author.bot != true) {
    try {
      await handleMsg(msg);
      await filter(msg);
    } catch (err) {
      const [file, line, column]: string[] = err.stack.match(/\b\w+.\w+:\d+:\d+/)[0].split(':');
      if (TESTING) {
        msg.channel.send(`**${err}**\n\`${file}\`: ${line}, ${column}`);
      } else {
        const NOTLIKEDUCK_URL = "https://cdn.discordapp.com/attachments/809915792581460010/837205801462530048/notlikeduck.png";
        const embed = createEmbed({
          title: "Something went wrong!",
          description: `**${err}**\n\`${file}\`: ${line}, ${column}`,
          color: "FF0000",
          thumbnail: NOTLIKEDUCK_URL,
          footer: true
        });
        msg.channel.send({ content: "<@712836610139488346>", embed })
      }
      throw err;
    }
  }
});

console.log(`\n${YELLOW}(2) Program ready...${RESET}`)
client.login(keys.bot);

export { client };