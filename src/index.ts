import * as Discord from "discord.js";

import * as keys from "../keys.json";
import { handleMsg } from "./handleMsg";

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
});

client.on("message", msg => {
  if (msg.author.bot != true) {
    handleMsg(msg);
  }
});

client.login(keys.bot);
