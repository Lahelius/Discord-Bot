module.exports = {
    name: 'resume',
    description : 'Resumes the currently playing track',
    async execute(message, args, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!message.member.voice.channel) return message.channel.send('You to be in a voice channel to use the resume command.')
        if(!serverQueue) return message.channel.send('There is not a song that is currently playing')
        if(serverQueue.playing) return message.channel.send("The music is already playing")
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send('The music has been resumed.')
        return undefined
    }

}