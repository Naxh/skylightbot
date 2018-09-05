const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let invCount = 0;
    message.guild.fetchInvites().then(res =>{res.forEach(inv =>{if(inv.inviter.id==message.author.id){
        invCount+=inv.uses
    }})}).then(g => {
        let embed = new Discord.RichEmbed()
        .setDescription(message.member + " has **" + invCount + "** invites!")
        .setTimestamp()
        .setColor("#f4d442");
        message.channel.send(embed);
    });
    
}

module.exports.help = {
    name: "invites"
}