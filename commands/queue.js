module.exports = {
    name: 'queue',
    description: 'Displays the contents of the queue',
    async execute(message, queue){
        const serverQueue = queue.get(message.guild.id);
        if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use music commands')
        if(!serverQueue) return  message.channel.send('The queue is currently empty')
        
        var output = 'Queue Contents\n'
        for(i=0; i<serverQueue.songs.length;i++){
            output += `${i+1}. ${serverQueue.songs[i].title}\n`
        }
        return message.channel.send(output)
    }
}