const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const ytdl =  require('ytdl-core')
const PREFIX = '!'

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready', () => console.log('G00nbot is ready'))

client.on('message', async message => {
  if(message.author.bot) return
  if(!message.content.startsWith(PREFIX)) return

  const args = message.content.substring(PREFIX.length).split(" ")

  if(message.content.startsWith(`${PREFIX}play`)){
    client.commands.get('play').execute(message, args)
  } else if (message.content.startsWith(`${PREFIX}leave`)){
    client.commands.get('leave').execute(message, args)
  } else if (message.content.startsWith(`${PREFIX}join`)) {
    client.commands.get('join').execute(message, args)
  }

})

client.login('NzM5Mjk0NjUyNzEyMzUzODUz.XyYXzA.zsqi7psJGiAc1M4SY-M6plpfxeI');
