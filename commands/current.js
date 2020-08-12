module.exports = {
    name: 'current',
    description: 'Gives information about the track that is currently playing',
    async execute(message, args, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!serverQueue || serverQueue.playing === false) return message.channel.send('No song is currently playing')
        message.channel.send(`Now Playing: ${serverQueue.songs[0].title}`)
        return undefined
    }
}