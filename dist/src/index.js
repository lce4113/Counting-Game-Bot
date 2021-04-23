"use strict";
exports.__esModule = true;
var Discord = require("discord.js");
var keys = require("../keys.json");
var client = new Discord.Client();
client.on("ready", function () {
    console.log("Connected as " + client.user.tag);
});
client.on("message", function (msg) {
    console.log("hEhE");
    msg.channel.send("hEhE");
});
client.login(keys.bot);
//# sourceMappingURL=index.js.map