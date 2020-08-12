const { execute } = require("./play");

module.exports = {
    name: 'skip',
    description: 'Skips the song that is currently playing',
    async execute(message, args, queue){
        const serverQueue = queue.get(message.guild.id);
        if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel im order for me to skip the current track")
        if(!serverQueue) return message.channel.send("The queue is empty at the moment.")
        serverQueue.connection.dispatcher.end();
        message.channel.send("The current song has been skipped")
        return undefined
    }
} 