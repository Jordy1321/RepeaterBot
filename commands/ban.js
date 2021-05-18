module.exports = {
  name: 'ban',
  description: "this is a ping command!",
  async execute(message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid Permissions")
      const user = message.mentions.users.first()
      if (user) {
        const member = message.guild.member(user) || message.guild.members.cahce.get(args[0])
        if (member) {
          member
            .ban({
              reason: 'They were bad!',
            })
            .then(() => {
              message.reply(`Successfully banned ${user.tag}`)
              message.react('760585884939714580')
            })
            .catch(err => {
              message.reply('I was unable to ban the member')
              console.error(err)
            })
        } else {
          message.reply("That user isn't in this server!")
        }
      } else {
        message.reply("You didn't mention the user to ban!")
      }
    }
  }