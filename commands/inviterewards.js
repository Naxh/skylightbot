const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Invite Rewards")
    .setColor("#2159b2")
    .setTimestamp()
    .setDescription(require("../index.js").rewards.map(reward => "**" + reward.name + "** - ``" + reward.invites + "`` invites"));
    message.channel.send(embed);
}
module.exports.help = {
    name: "inviterewards"
}