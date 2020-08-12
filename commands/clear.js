const { execute } = require("./resume");

module.exports = {
    name: 'clear',
    description: 'Clears the song queue',
    async execute(message, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!serverQueue) return message.channel.send('The queue is already empty')
        serverQueue.songs = []
        return message.channel.send('The queue has been cleared')
    }
}