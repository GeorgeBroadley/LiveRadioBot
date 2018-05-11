var Discord = require("discord.js");
var config  = require("./config.json");
var radio   = require("./radio.json");
var opus    = require("opusscript");
var bot     = new Discord.Client();

bot.on("ready", function () {
    console.log("Bot is up and running in " + bot.channels.length + " channels");
    bot.channels.get(config.channelID).join().then(connection => {
        connection.playStream(config.radioURL);
    });
});

bot.on("disconnected", function () {
    console.log("Disconnected from Discord");
    process.exit(1);
});

bot.on("message", function (message) {
    if (message.author.bot) { return }
    if (message.content.indexOf("!") !== 0) { return }

    var args = message.content.slice(1).trim().split(/ +/g);
    var command = args.shift().toLowerCase();

    switch(command) {
    case (rejoin) :
        bot.channels.get(config.channelID).join().then(connection => {
            connection.playStream(config.radioURL);
        });
        break;
    }
});

console.log("Logging in...");
bot.login(config.tokenID);
