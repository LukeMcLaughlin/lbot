// Discord Server Bot:
const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');

// On start, print message:
client.on('ready', () => {
    console.log(`Connected as: ${client.user.tag}` + `\nBot ID: ${client.user.id}...`);
    client.user.setActivity("you...", {type: "WATCHING"});      // Sets Bot Activity

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name);
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
        });
    });
    // let botChannel = client.channels.cache.get("CHANNEL_ID");
    // const attachment = new Discord.MessageAttachment("url");
    // botChannel.send("Hi Everyone, I'm here to help! \n");
    // botChannel.send(attachment);

});

// Respond to ping:
client.on ('message', msg => {
    if (msg.author == client.user) {
        return;
    }
    else if (msg.content.startsWith("!")) {
        parseCommand(msg);
    }
});

function parseCommand(msg) {
    let fullCommand = msg.content.substring(1);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let args = splitCommand.slice(1);

    switch (primaryCommand){
        // Respond to ping, check availablility:
        case 'ping':
            msg.reply("I'm listening");
            break;
        
        // Provide help where needed:
        case 'help':
            helpCommand(args, msg);
            break;
        
        // Default responseif no valid commands are sent:
        default:
            msg.channel.send("Unknown command, type '!help commands' for a list of valid commands.");
    }
}

// Provide help depending on arguments provided
function helpCommand(args, msg) {
    if (args.length == 0) {
        msg.reply("If you need help, type '!help [topic]'");
    }
    else {
        switch (args[0]) {
            case 'commands':
                msg.channel.send("Commands go here");
                break;
            
            default:
                msg.channel.send("I'm not sure what you're asking, type '!help commands' for a list of valid commands.");
        }
    }
}

// Login token: 
client.login(auth.token)
