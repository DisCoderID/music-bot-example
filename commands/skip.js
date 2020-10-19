module.exports = {
  name: "skip",
  alias:["voteskip","vs"],
  description:"Skip currently playing song with vote",
  run: async(client, message) => {
    let serverQueue = client.queue.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send("You need to join a voice channel first!")
    if(message.member.voice.channel.id !== serverQueue.channel.id) return message.reply("You need join same voice channel with me!")
    if (!serverQueue) return message.channel.send('There is nothing playing.')
    let song = serverQueue.songs[0]   
    let jumem = serverQueue.channel.members.filter(member => !member.user.bot).size
    if (serverQueue.songs[0].vote.includes(message.author.id)) return message.channel.send(`${message.author}, you have already voted! \`\`${song.vote.length}/${jumem}\`\` votes.`);
    
    song.vote.push(message.author.id);
        message.channel.send(`${message.author} voted! \`\`${song.vote.length}/${jumem}\`\` votes.`);
        if (song.vote.length >= jumem) return serverQueue.connection.dispatcher.end();
    
}
};
