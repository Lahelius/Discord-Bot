module.exports = {
    name: 'clear',
    description: 'Clears the song queue',
    async execute(message, queue){
        const serverQueue = queue.get(message.guild.id)
        message.channel.send("```The list of commands are the following (NOTE ALL COMMANDS MUST CONTAIN THE PREFIX OF'!') \n join let's the bot join in the voice channel you're currently in (MUST BE IN A CALL FOR THIS TO WORK) \n play followed by the youtube link plays the song of your choice. NOTE you can add multiple songs to a queue by constantly calling the play command even while a song is playing. \n pause pauses the song, while resume continues the song where you paused it \n leave tells the bot to leave the voice channel \n current displays the current song playing \n queue shows all songs that are in the general queue list from play calls \n clear removes all songs in the general queue \n volume adjusts the bots very own output audio from a range 1-10 where 5 is the default NOTE this range is always reset to 5 when the bot enters the voice channel \n skip starts the next song in the middle of the current song in your playlist or the general queue WARNING DO NOT SKIP WHILE PAUSED THIS WILL CRASH THE BOT \n loop repeats the song (ask collaborator for example) \n playlist users can create their own playlists and save them whenever they want. HOW TO USE: "!playlist create 'playlist_name'" creates your playlist \n "!playlist content 'playlist_name'" shows your playlists songs \n "!playlist add 'youtube_link' 'playlist_name'" adds your selected song to your playlist \n Thank you and enjoy! ```
        return
    }
}
