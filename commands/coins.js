const Discord = require("discord.js");
const User = require("../models/user.js");
module.exports.run = async (bot, message, args) => {
    let user = await User.findOrCreate(message.guild, message.author);
    let embed = new Discord.RichEmbed()
    .setAuthor("Coins for " + message.author.tag, message.author.avatarURL)
    .addField("Coins", user.coins, true)
    .addField("Coin Multiplier", user.coinmultiplier)
    .setTimestamp()
    .setColor("#2159b2");
    message.channel.send(embed);
}
module.exports.help = {
    name: "coins"
}