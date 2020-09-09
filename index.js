const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const {token} = require('./config.json');

const PREFIX = '!';

var attendees = [];


client.on('ready', () =>{
    console.log('This bot is online!');
})

//OLD WAY OF SENDING BOT MSGS.

/*client.on('message', message=>{
    
    
    let args = message.content.substring(PREFIX.length).split(" ");

    //Array. ie. arg 0 --> ping in this case. arg 1 would be the next string 
    switch(args[0]){
        case 'ping':
            message.channel.sendMessage('pong!');
        break;
    }
})*/

//Looking for something in the text do return something
client.on('message', message =>{
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //Basic Ping Pong command
    if(command === 'ping')
    {
        message.channel.send('pong!');
        //Twitch Channel Command
    } 
    else if(command == 'twitch')
    {
        message.channel.send('https://twitch.tv/skeecoops');
        //Twitter Page Command
    } 
    else if(command == 'twitter')
    {
        message.channel.send('https://twitter.com/SkeeCoops');
    }
    else if(command == 'here')
    {
        attendees.push(' '+message.member.displayName);
        message.channel.send('List updated!')

    }
    else if(command == 'clear')
    {
        attendees = [];

        message.channel.send('List cleared!');
    }
    else if(command == 'export')
    {
        fs.writeFile('attendance.txt', attendees, (err) => {
            if (err) throw err;
        })

        message.channel.send('Attendance List: ');
        message.channel.send(new Discord.MessageAttachment('./attendance.txt'));
    }

    
});

client.login(token);