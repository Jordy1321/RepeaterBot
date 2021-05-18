module.exports = {
  name: 'kick',
  description: "this is a ping command!",
  async execute(message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Invalid Permissions")
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick({
              reason: 'They were bad!',
            })
            .then(() => {
              const channel = member.guild.channels.cache.find(ch => ch.name === 'logs');
              if (!channel) return;
              channel.send(`${user.user.tag} has been kicked by ${message.member}`);
              message.reply(`Successfully kicked ${user.tag}`)
              message.react('760585884939714580')
            })
            .catch(err => {
              message.reply('I was unable to kick the member');
              console.error(err);
            });
        } else {
          message.reply("That user isn't in this server!");
        }
      } else {
        message.reply("You didn't mention the user to kick!");
      }
    }
  }