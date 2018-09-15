const Discord = require("discord.js");
const User = require("../models/user.js");

module.exports.run = async (bot, message, args) => {
    if(!args[0]){
        let user = User.findOrCreate(message.guild, message.author);
        message.reply("You have ``$" + user.credits + "`` credits!");
    }
}
module.exports.help = {
    name: "credits"
}