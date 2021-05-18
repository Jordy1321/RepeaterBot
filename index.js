const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./data/config.json');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	var messageToRepeat = message.content.toLocaleLowerCase()
	if (message.author.bot) return;
	if (message.channel.id === '788690703433072650') {
		if (messageToRepeat.includes('stop repeating me')) {
			message.channel.send("no")
		} else if (messageToRepeat.includes('stop')) {
			message.channel.send("no")
		} else if (messageToRepeat.includes('im dumb') || messageToRepeat.includes('im stupid') || messageToRepeat.includes('im retarted') || messageToRepeat.includes('im a retard') || messageToRepeat.includes('retarted') || messageToRepeat.includes('dumb') || messageToRepeat.includes('stupid')) {
			message.channel.send("I know")
		} else {
			message.channel.send(message)
		}
	}
	if (message.channel.type === "dm") return;

	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);