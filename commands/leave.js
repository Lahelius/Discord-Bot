module.exports = {
  name: 'leave',
  descrpition: "The bot leaves the channel that the member is in",
  async execute(message, args){
    message.member.voice.channel.leave()
    return undefined
  }
}
