const Discord = require("discord.js");
const User = require("../models/user.js");
module.exports.run = async (bot, message, args) => {
    let user = await User.findOrCreate(message.guild, message.author);
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTimestamp()
    .setFooter((user.level*750)-user.xp + " xp needed to level up!")
    .addField("XP", user.xp, true)
    .addField("Level", user.level, true)
    .setColor("#2159b2");
    message.channel.send(embed);
}
module.exports.help = {
    name: "level"
}