const Discord = require("discord.js");
const fs = require("fs");
const User = require("../models/user.js");  

module.exports.run = async(bot,message,args) => {
    message.delete();
    message.channel.send("✅Sent a dm").then(msg => {msg.delete(2000)});

    
    
    let member = message.member;
    let guild = message.guild;
    let user = await User.findOrCreate(message.guild, message.author);


    const embed = new Discord.RichEmbed() 

     
    .setColor("#ff4b4b")
    .setAuthor(`${message.member.user.tag}, Welcome to the SkyLight Shop`, message.author.displayAvatarURL)
    .addField(`**2.00x xp boost**`, "500 coins")
    .addField(`**2.00x coin boost**`, "500 coins")
    .addField("**5** credits", "250 coins")
    .addField("**1 Advertisement**", "250 coins")
    .addField(`**Your coins**`, user.coins)
message.author.send(embed);
    message.author.send("Say the name of item you would like to buy").then(async ms =>{
      const collector = new Discord.MessageCollector(ms.channel, m => message.author.id === message.author.id, { time: 180000});
      collector.on('collect', async message => {
        if(message.content.toLowerCase() == "2.00x xp boost") {
          if(user.xpmultiplier == 2) return message.reply("You already have that boost!");
          if(user.coins < 500) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 2.00x xp boost")
          user.coins -= 500;
          user.xpmultiplier = 2;
          user.save();
          collector.stop();
        }
        if(message.content.toLowerCase() == "2.00x coin boost") {
          if(user.coinmultiplier == 2) return message.reply("You already have that boost!");
          if(user.coins < 500) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 2.00x coin boost")
          
          user.coins -= 500;
          user.coinmultiplier = 2;
          user.save();
          collector.stop()
        }
        if(message.content.toLowerCase() == "5 credits") {
          if(user.coins < 250) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 5 credits")
          
          user.coins -= 250;
          user.credits += 5;
          user.save();
          collector.stop()
        }
        if(message.content.toLowerCase() == "1 advertisement") {
          if(user.coins < 250) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 1 Advertisement")
          
          user.coins -= 250;
          user.save();
          let guild = bot.guilds.get("485897985960443936")
          let msgs = await guild.channels.get("491032995646668820").fetchMessages().then(msg => msg.array().length);
          guild.channels.get("491032995646668820").send("Advertisement " + msgs + "\nOwner: " + guild.member(message.author.id) + "\n\n```\nNo content yet! Use ``-ad " + msgs + " content here`` to set the content!\n```");
          collector.stop()
        }
        
    
          
  })
})
}
                                                    
module.exports.help = {
    name: "shop"
}