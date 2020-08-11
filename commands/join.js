module.exports = {
  name: 'join',
  description: 'This command cause the bot to join the channel of the user who called it.',
  async execute(message, args){
    const voiceChannel = message.member.voice.channel
    if(!voiceChannel) return message.channel.send("You need to be in a voice channel in order for me to join!")
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if(!permissions.has('CONNECT')) return message.channel.send("I dont\'t have permission to connect to the voice channel!")
    if(!permissions.has('SPEAK')) return message.channel.send("I dont\'t have permission to speak in the voice channel!")
    try{
      var connection = await voiceChannel.join()
    } catch(error){
      console.log(`There was an error connecting to the voice channel: ${error}`)
      return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
    }
  }
}
