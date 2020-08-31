
module.exports = {
    name: 'Shuffle',
    description: 'Shuffles the songs in the playlist or Queue',
    async execute(message, args, queue){
        const serverQueue = queue.get(message.guild.id)
        if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use music commands')
        if(!serverQueue) return message.channel.send("No song is currently playing")
        if(args[1] === 'list'){
			if(!playlists) return message.channel.send('There aren\'t any playlists saved')
			var output = 'Playlist\n'
			var keys = Object.keys(playlists)
			for(i = 0; i<keys.length;i++){
				output += `${i+1}. ${keys[i]}\n`
			}
			return message.channel.send(output)
		}
		else if(args[1] === 'content'){
        	if(!playlists[args[2]])return message.channel.send(`A playlist of name ${args[2]} doesn't exist`)
        	var output = `Playlist ${args[2]} Contents\n`
    		for(i = 0; i<playlists[args[2]].length;i++){
				output += `${i+1}. ${playlists[args[2]][i].title}\n`
        	}
			return message.channel.send(output)
		}
    }
}
