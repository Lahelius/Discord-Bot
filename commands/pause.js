const { execute } = require("./play");
const { Message } = require("discord.js");

module.exports = {
    name: 'pause',
    description : 'Pauses the currently playing track',
    async execute(message, args, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!message.member.voice.channel) return message.channel.send('You to be in a voice channel to use the pause command.')
        if(!serverQueue) return message.channel.send('There is not a song that is currently playing')
        if(!serverQueue.playing) return message.channel.send("The current track is already paused")
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send('The music has been paused.')
        return undefined
    }

}