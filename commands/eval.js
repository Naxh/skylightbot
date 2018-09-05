const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (message.author.id !== "172131900289187849")
      return message.channel.send("You don't have permission to use this command")
    try {
        const code = args.join(" ");
        let evaled = await eval(code);
        let embed1 = new Discord.RichEmbed()
        .setAuthor("Input")
        .setDescription(message.content)
        .setColor("#cbf442");
        let embed2 = new Discord.RichEmbed()
        .setAuthor("Output")
        .setDescription(clean(evaled).slice(0, 2000), {code: "js"})
        .setColor("#cbf442");
        message.channel.send(embed1);
        message.channel.send(embed2);
      } catch (err) {
          let embed = new Discord.RichEmbed()
          .setAuthor("ERROR")
          .setColor("#cbf442")
          .setDescription(`\`\`\`xl\n${clean(err)}\n\`\`\``);
          message.channel.send(embed);
      } 
  }
  function clean(text) {
    if (typeof evaled !== "string")
      text = require("util").inspect(text)
    text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text.slice(0, 1990);
  }
  
  module.exports.help = {
   name: "eval" 
  }


