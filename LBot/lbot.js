var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');


// Logger settings config:
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Initialise LBot:
var bot = new Discord.Client({  //
    token: auth.token,          // Calls token value from auth.json
    autorun: true
});

bot.on('ready', function(evt){
    console.log('Bot Connected');
    console.log('Logged in as: ' + bot.username);
    console.log('Bot ID: ' + bot.id)
});


// Bot will listen for messages starting with '!':
bot.on('message', function(user, userID, channelID, message, evt){
    if(message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd){
            // !ping    -   Check Operation
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: "I'm listening"
                });
                break;
            // !help    -   List Commands
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: "help message goes here"
                })
            // Add more commands (using case) as needed:
        }
    }
});