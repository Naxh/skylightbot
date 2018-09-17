module.exports.run = async (bot, message, args) => {
    if(!args[0] || !args[1]) return message.channel.send("Invalid format! ``-ad <ad number> <content>``");
    let msg;
    await message.guild.channels.get("491032995646668820").fetchMessages(msgs => {msgs.array().forEach(element => {if(element.content.split("\n")[0].split("Advertisement ")[0] == args[0]) msg = element})});
    if(!msg) return message.channel.send("I could not find that advertisement!");
    if(msg.content.split("\n")[1].split("Owner: ")[0] !== message.author.id) return message.channel.send("You are not the owner of that advertisement!");
    
}
module.exports.help = {
    name: "ad"
}