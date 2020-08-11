const Discord = require('discord.js')

const client = new Discord.Client()
const ytdl =  require('ytdl-core')
const PREFIX = '!'

client.on('ready', () => console.log('G00nbot is ready'))

client.on('message', async message => {
  if(message.author.bot) return
  if(!message.content.startsWith(PREFIX)) return

  const args = message.content.substring(PREFIX.length).split(" ")

  if(message.content.startsWith(`${PREFIX}play`)){
    const voiceChannel = message.member.voice.channel
    if(!voiceChannel) return message.channel.send("You need to be in a voice channel to play music")
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if(!permissions.has('CONNECT')) return message.channel.send("I dont\'t have permission to connect to the voice channel!")
    if(!permissions.has('SPEAK')) return message.channel.send("I dont\'t have permission to connect to the voice channel!")

    try{
      var connection = await voiceChannel.join()
    } catch(error){
      console.log(`There was an error connecting to the voice channel: ${error}`)
      return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
    }

    const dispatcher = connection.play(ytdl(args[1]))
    .on('finish', () => {
      voiceChannel.leave()
    })
    .on('error', error =>{
      console.log(error)
    })
    dispatcher.setVolumeLogarithmic(5/5)
  } else if (message.content.startsWith(`${PREFIX}stop`)){
    if(!message.member.voice.channel) return message.channel.send("you need to be in voice channel to stop the music")
    message.member.voice.channel.leave()
    return undefined
  }

})

client.login('NzM5Mjk0NjUyNzEyMzUzODUz.XyYXzA.zsqi7psJGiAc1M4SY-M6plpfxeI');
