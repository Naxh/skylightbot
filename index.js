const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const invites = {};
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) =>{

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() == "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.")
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        
    });

});

bot.on('ready', async () => {
    console.log(bot.user.username + " is now online!!");
    bot.user.setActivity("in SkyLightServices!");
    setInterval(function(){
        bot.user.setActivity("in development");
        setTimeout(function(){
            bot.user.setActivity("in SkyLightServices!");
        }, 10000)
    }, 20000)
    setTimeout(function(){

    // Load all invites for all guilds and save them to the cache.
    bot.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
        invites[g.id] = guildInvites;
        });
    });
});
})

bot.on('message', async (message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let prefix = "-";
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);
})
bot.on('guildMemberAdd', async (member) => {
    member.guild.fetchInvites().then(guildInvites => {
        const ei = invites[member.guild.id];
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        let channel = member.guild.channels.find("name", "join-leave");
        let embed = new Discord.RichEmbed()
        .setAuthor("New Member!")
        .setDescription("Welcome " + member + " to **" + member.guild.name + "**! Make sure to read " + member.guild.channels.find("name", "rules") + "! You were invited by " + invite.inviter + "!")
        .setColor("RANDOM")
        .setFooter(member.guild.memberCount + " members")
        .setTimestamp();
        channel.send(embed);
    })
})

bot.on('guildMemberRemove', async (member) => {
    let channel = member.guild.channels.find("name", "join-leave");
    let embed = new Discord.RichEmbed()
    .setAuthor("Member Left")
    .setDescription(member + " (" + member.user.tag + ") has left the server!")
    .setColor("RANDOM")
    .setFooter(member.guild.memberCount + " members")
    .setTimestamp();
    channel.send(embed);
})
bot.login(proces.env.TOKEN);