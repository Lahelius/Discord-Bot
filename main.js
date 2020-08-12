const Discord = require('discord.js')
const fs = require('fs')
const {PREFIX, token} = require('./config.json')
const client = new Discord.Client()
const ytdl =  require('ytdl-core')
const queue = new Map()


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
  const serverQueue = queue.get(message.guild.id)

  if(message.content.startsWith(`${PREFIX}play`)){
    client.commands.get('play').execute(message, args, serverQueue, queue)
  } else if (message.content.startsWith(`${PREFIX}leave`)){
    client.commands.get('leave').execute(message, args)
  } else if (message.content.startsWith(`${PREFIX}join`)) {
    client.commands.get('join').execute(message, args)
  }

})

client.login(token);
