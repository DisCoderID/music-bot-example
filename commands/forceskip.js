module.exports = {
  name:"forceskip",
  alias:["fs"],
  description: "Force skip currently song",
  run: async(client, message) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel first!").catch(console.error);
    if (!serverQueue)
      return message.channel.send("There is nothing playing that I could skip for you.").catch(console.error);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id) return message.reply("You need join same voice channel with me!")
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(`${message.author} ⏭ skipped the song`).catch(console.error);
  }
};