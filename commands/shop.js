const Discord = require("discord.js");
const fs = require("fs");
const User = require("../models/user.js");  

module.exports.run = async(bot,message,args) => {
    message.delete();
    message.channel.send("✅Sent a dm").then(msg => {msg.delete(2000)});

    
    
    let member = message.member;
    let guild = message.guild;
    let {coins, 
         xp
       } = await User.findOrCreate(message.guild, message.author);


    const embed = new Discord.RichEmbed() 

     
    .setColor("#ff4b4b")
    .setAuthor(`${message.member.user.tag}, Welcome to the SkyLight Shop`, message.author.displayAvatarURL)
    .addField(`**2.00x xp boost**`, "500 coins")
    .addField(`**2.00x coin boost**`, "500 coins")
    .addField(`**Your coins**`, coins)
message.author.send(embed);
    message.author.send("Say the name of item you would like to buy").then(ms =>{
      const collector = new Discord.MessageCollector(ms.channel, m => message.author.id === message.author.id, { time: 180000});
      collector.on('collect', message => {
        if(message.content.toLowerCase() == "2.00x xp boost") {
          if(xpmultiplier == 2) return message.reply("You already have that boost!");
          if(coins < 500) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 2.00x xp boost")
          coins -= 500;
          xpmultiplier = 2;
           User.updateOne({ guildID: guild.id, userID: message.author.id }, { coins: coins })
             .catch(function(error,affected,resp){
               if(error) console.log(error);
          });
          collector.stop();
        }
        if(message.content.toLowerCase() == "2.00x coin boost") {
          if(coinmultiplier == 2) return message.reply("You already have that boost!");
          if(coins < 500) return message.reply("You do not have enough coins for that item!")
          message.reply("You have bought the 2.00x coin boost")
          
          coins -= 500;
          coinmultiplier = 2;
          User.updateOne({ guildID: message.guild.id, userID: message.author.id }, { coins: coins})
             .catch(function(error,affected,resp){
                if(error) console.log(error);
                });
          collector.stop()
        }
        
    
          
  })
})
}
                                                    
module.exports.help = {
    name: "shop"
}