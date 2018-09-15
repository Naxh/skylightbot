const Discord = require("discord.js");
const User = require("../models/user.js");

module.exports.run = async (bot, message, args) => {
    if(!args[0]){
        let user = await User.findOrCreate(message.guild, message.author);
        message.reply("You have ``" + user.credits + "`` credits!");
    }
    if(args.length == 1) return message.reply("Invalid arguments! Provide ``view`` or ``add``");
    if(args[0] == "view"){
        if(!args[1]) return message.reply("Please provide a user!");
        let target = message.mentions.users.first();
        if(!target) return message.reply("That is not a user!");
        let user = await User.findOrCreate(message.guild, target);
        message.reply("That user has ``" + user.credits + "`` credits!");
    }
    if(args[0] == "add"){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission for that command!")
        if(!args[1]) return message.reply("Please provide a user!");
        let target = message.mentions.users.first();
        if(!target) return message.reply("That is not a user!");
        if(!args[2]) return message.reply("Please provide an amount of credits!");
        if(!parseInt(args[2])) return message.reply("That is not an integer!");
        let user = await User.findOrCreate(message.guild, target);
        user.credits += parseInt(args[2]);
        user.save();
        message.channel.send(":white_check_mark: ``" + args[2] + "`` credits have been added to ``" + user.tag + "``'s credit balance!");
    }
}
module.exports.help = {
    name: "credits"
}