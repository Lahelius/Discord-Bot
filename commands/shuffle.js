
module.exports = {
    name: 'Shuffle',
    description: 'Shuffles the songs in the playlist or Queue',
    async execute(message, args, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use music commands')
        if(!serverQueue) return message.channel.send("No song is currently playing")
    }
}
