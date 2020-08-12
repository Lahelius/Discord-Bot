module.exports = {
    name: 'volume',
    description: 'Sets the volume of the bot',
    async execute(message, args, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to play music')
        var num = parseInt(args[1])
        if(isNaN(num) || num > 10 || num<1) return message.channel.send('The volume needs to be a value ranging from 1 to 10')
        serverQueue.volume = num
        serverQueue.connection.dispatcher.setVolumeLogarithmic(serverQueue.volume/5)
        return undefined
    }
}