const Discord = require('discord.js');

module.exports = {
    name: 'rps',
    description: "this is a meme command!",
    async execute(message, args){
        const acceptedReplies = ['test', 'test2'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
        message.channel.send(result)
    }
}