const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.guild.fetchInvites().then(res => {
        let invs = new Discord.Collection();
        res.forEach(i => {
            if(!message.guild.member(i.inviter.id)) return;
            if(!invs.has(i.inviter.id)) invs.set(i.inviter.id, i.uses);
            else invs.set(i.inviter.id, invs.get(i.inviter.id)+i.uses);
        })
        let desc = "";

        //do something with invs
        console.log(invs.sort((a, b) => b - a))
        desc += invs.sort((a, b) => b - a).firstKey(10).map((id, index) => "**" + (index+1) + ".** " + (message.guild.member(id) ? message.guild.member(id) : "``Unknown``") + " - **" + invs.sort((a, b) => b - a).array()[index] + " invites**").join("\n");
        let embed = new Discord.RichEmbed()
        .setAuthor("Top Inviters")
        .setTimestamp()
        .setFooter(bot.user.tag + " by ThisLightMan#6616")
        .setDescription(desc);
        message.channel.send(embed);    
    })
}

module.exports.help = {
    name: "invitetop"
}