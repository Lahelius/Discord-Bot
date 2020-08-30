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

client.on('ready', () => console.log('Bot is ready'))

client.on('message', async message => {
  if(message.author.bot) return
  if(!message.content.startsWith(PREFIX)) return

  const args = message.content.substring(PREFIX.length).split(" ")
  const serverQueue = queue.get(message.guild.id)

  if(message.content.startsWith(`${PREFIX}playlist`)){
    client.commands.get('playlist').execute(message, args, queue, client)
  } else if(message.content.startsWith(`${PREFIX}play`)){
    client.commands.get('play').execute(message, args, queue)
  } else if (message.content.startsWith(`${PREFIX}leave`)){
    client.commands.get('leave').execute(message, args)
  } else if (message.content.startsWith(`${PREFIX}join`)) {
    client.commands.get('join').execute(message, args)
  } else if (message.content.startsWith(`${PREFIX}skip`)){
    client.commands.get('skip').execute(message, args, queue)
  }else if (message.content.startsWith(`${PREFIX}pause`)){
    client.commands.get('pause').execute(message, args, queue)
  }else if (message.content.startsWith(`${PREFIX}resume`)){
    client.commands.get('resume').execute(message, args, queue)
  }else if (message.content.startsWith(`${PREFIX}current`)){
    client.commands.get('current').execute(message, args, queue)
  }else if (message.content.startsWith(`${PREFIX}volume`)){
    client.commands.get('volume').execute(message, args, queue)
  }else if (message.content.startsWith(`${PREFIX}loop`)){
    client.commands.get('loop').execute(message, args, queue)
  }else if (message.content.startsWith(`${PREFIX}clear`)){
    client.commands.get('clear').execute(message, queue)
  }else if (message.content.startsWith(`${PREFIX}queue`)){
    client.commands.get('queue').execute(message, queue)
  }
})

client.login(token);
