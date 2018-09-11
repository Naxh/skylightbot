const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Invite Rewards")
    .setColor("#2159b2")
    .setTimestamp()
    .setDescription(require("../index.js").rewards.map((name, type, invites) => "**" + name + "** - ``" + invites + "`` invites"));
    message.channel.send(embed);
}
module.exports.help = {
    name: "inviterewards"
}