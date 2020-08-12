module.exports = {
    name: 'loop',
    description: 'Changes the type of the loop',
    async execute(message, args, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use music commands')
        if(!serverQueue) return message.channel.send("No song is currently playing")
        if(args[1] !== 'track' && args[1] !== 'off' && args[1] !== 'queue') return message.channel.send("The loop command can only have arguments of \'track\', \'off\', \'queue")
        serverQueue.loop = args[1]
        return undefined
    }
}