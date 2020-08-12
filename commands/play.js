const ytdl = require('ytdl-core')
module.exports = {
  name: 'play',
  descrpition: "Loads and plays the song",
  async execute(message, args, serverQueue, queue){
    const voiceChannel = message.member.voice.channel
    if(!voiceChannel) return message.channel.send("You need to be in a voice channel to play music")
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if(!permissions.has('CONNECT')) return message.channel.send("I dont\'t have permission to connect to the voice channel!")
    if(!permissions.has('SPEAK')) return message.channel.send("I dont\'t have permission to speak in the voice channel!")

    const songDetails = await ytdl.getInfo(args[1])
    const song = {
      title: songDetails.videoDetails.title,
      url: songDetails.videoDetails.video_url
    }
    
    if(!serverQueue){
      const queueConstruct = {
        textChannel : message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      }
      queue.set(message.guild.id, queueConstruct)
      queueConstruct.songs.push(song)
    
      try{
        var connection = await voiceChannel.join()
        queueConstruct.connection = connection
        playSong(message.guild, queueConstruct.songs[0], queue)
      } catch(error){
        console.log(`There was an error connecting to the voice channel: ${error}`)
        return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
      }
    } else{
      serverQueue.songs.push(song)
      return message.channel.send(`${song.title} has been added to the queue`)
    }
  }
}


function playSong(guild, song, queue){
  const serverQueue = queue.get(guild.id)
  
  if(!song){
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection.play(ytdl(song.url))
  
  .on('finish', () => {
    serverQueue.songs.shift()
    playSong(guild, serverQueue.songs[0], queue)
  })
  .on('error', error =>{
    console.log(error)
  })
  dispatcher.setVolumeLogarithmic(serverQueue.volume/5)

}