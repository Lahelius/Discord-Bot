const Discord = require('discord.js')
const playlists = require('../playlists.json')
const ytdl = require('ytdl-core');
const fs = require("fs")

module.exports = {
    name: 'playlist',
    description: 'List all playlists saved',
    async execute(message, args, queue, client){
        const serverQueue = queue.get(message.guild.id);
		if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use music commands')	
		
		//Handler for `!playlist list' command 
		if(args[1] === 'list'){
			if(!playlists) return message.channel.send('There aren\'t any playlists saved')
			var output = 'Playlist\n'
			var keys = Object.keys(playlists)
			for(i = 0; i<keys.length;i++){
				output += `${i+1}. ${keys[i]}\n`
			}
			return message.channel.send(output)
		}
		
		//Handler for `!playlist content [name]` command
		else if(args[1] === 'content'){
        	if(!playlists[args[2]])return message.channel.send(`A playlist of name ${args[2]} doesn't exist`)

        	var output = `Playlist ${args[2]} Contents\n`
    		for(i = 0; i<playlists[args[2]].length;i++){
				output += `${i+1}. ${playlists[args[2]][i].title}\n`
        	}
			
			return message.channel.send(output)
		}
		
		//Handler for `!playlist create [name]` command
		else if(args[1] === 'create'){
			if(playlists[args[2]]) return message.channel.send(`A playlist with the name ${args[2]} already exists`)
			playlists[args[2]] = []
		}
		
		//Handler for `!playlist delete [name]` command
		else if(args[1] === 'delete'){
			if(!playlists[args[2]]) return message.channel.send(`A playlist of the name ${args[2]} doesn't exist`)
			delete playlists[args[2]]
			message.channel.send('The ${args[2]} playlist was deleted')
		}

		//Handler for `!playlist load [name]` command 
		else if(args[1] === 'load'){
			if(!playlists[args[2]])return message.channel.send(`A playlist of name ${args[2]} doesn't exist`)

			for(i=0; i<playlists[args[2]].length;i++){
				const newArgs = ['!play', playlists[args[2]][i].url]
				await client.commands.get('play').execute(message, newArgs, queue)
			}

			return message.channel.send(`The ${args[2]} playlist has been loaded into the queue`)
		} 
		
		//Handler for `!playlist add [link] [name]` command
		else if(args[1] === 'add'){
			if(!playlists[args[3]]) return message.channel.send('This playlist does not exist')
			
			const songDetails = await ytdl.getInfo(args[2])
			
			const song = {
            	title: songDetails.videoDetails.title,
            	url: songDetails.videoDetails.video_url
			}
			  
        	if(playlists[args[3]] === undefined) playlists[args[3]] = []
        	playlists[args[3]].push(song)
			message.channel.send(`${songDetails.videoDetails.title} was added to the ${args[3]} playlist`)
		}
		
		//Update the playlists.json file with any changes that have been made
		fs.writeFile('./playlists.json', JSON.stringify(playlists, undefined, 4), err =>{
			if(err) console.log('Error writing file', err)
			else {
				console.log('Successfully wrote file') 
				message.channel.send('Playlist was made!')
			}
		})
		   
		return undefined
    }
}
