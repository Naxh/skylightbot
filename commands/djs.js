const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if(!args[0]) {
        const embed = new Discord.RichEmbed()
        .setAuthor("Discord.js Docs")
        .setDescription("You need to provide a search query")
        .setColor("#d80404");
        return message.channel.send(embed).then(msg => {msg.delete(5000)});
    }
    require("fs").readFile("discord.json", "utf-8", function(err, json){
        json = JSON.parse(json);
        var string = args.join(" ");
        string = string.replace(/(\.|\s)/g, '#');
        var found;
        json.classes.forEach(element => {
            if(element.name.toLowerCase() == string.toLowerCase().split("#")[0]) found = element;
        });
        if(!found) {
            const embed = new Discord.RichEmbed()
            .setAuthor("Discord.js Docs")
            .setDescription("Nothing was found in the docs for the search query ``" + string + "``")
            .setColor("#d80404");
            return message.channel.send(embed).then(msg => {msg.delete(5000)});
        }
        if(!string.toLowerCase().split("#")[1]){
            const embed = new Discord.RichEmbed()
            .setColor("#30acf4")
            .setAuthor("Discord.js Docs", "https://discord.js.org/static/logo-square.png")
            .setDescription(`\n__[${found.name}](https://discord.js.org/#/docs/main/stable/class/${found.name})__\n**${found.description}**`);
            if(found.props) embed.addField("Properties", found.props.map(prop => "``" + prop.name + "``").join(" "));
            if(found.methods) embed.addField("Methods", found.methods.map(method => "``" + method.name + "`` ").join(" "));
            if(found.events) embed.addField("Events", found.events.map(event => "``" + event.name + "`` ").join(" "));
            message.channel.send(embed);
        } else {
            var pr = string.toLowerCase().split("#")[1];
            var foundProp;
            var scrollTo;
            if(!foundProp && found.props)
                found.props.forEach(prop => {
                    if(prop.name.toLowerCase() == pr) {
                        foundProp = prop;
                        scrollTo = prop.name;
                    }
                })

            if(!foundProp && found.methods)
                found.methods.forEach(method => {
                    if(method.name.toLowerCase() == pr) {
                        foundProp = method;
                        scrollTo = method.name;
                    }
                })

            if(!foundProp && found.events)
                found.events.forEach(event => {
                    if(event.name.toLowerCase() == pr) {
                        foundProp = event;
                        scrollTo = "e-" + event.name;
                    }
                })
            if(!foundProp) {
                const embed = new Discord.RichEmbed()
                .setAuthor("Discord.js Docs")
                .setDescription("Nothing was found in the docs for the search query ``" + string + "``")
                .setColor("#d80404");
                return message.channel.send(embed).then(msg => {msg.delete(5000)});
            }
            const embed = new Discord.RichEmbed()
            .setColor("#30acf4")
            .setAuthor("Discord.js Docs", "https://discord.js.org/static/logo-square.png")
            .setDescription(`\n__[${string}](https://discord.js.org/#/docs/main/stable/class/${found.name}?scrollTo=${scrollTo})__\n**${foundProp.description}**`);
            if(foundProp.type) {
                var type = foundProp.type[0][0] + "";
                embed.addField("Type", type.charAt(0).toUpperCase() + type.slice(1));
            }
            message.channel.send(embed);
        }
    })  
}
module.exports.help = {
    name: "djs"
}
