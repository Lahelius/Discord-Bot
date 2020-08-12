module.exports = {
    name: 'pause',
    description : 'Pauses the currently playing track',
    async execute(message,args, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use the pause command.')
        if(!serverQueue) return message.channel.send('No song is currently being played')
        if(!serverQueue.playing) return message.channel.send("The current track is already paused")
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send('The music has been paused.')
        return undefined
    }

}
