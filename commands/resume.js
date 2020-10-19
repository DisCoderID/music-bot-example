module.exports = {
  name: "resume",
  alias:["rsm"],
  description: "Resume currently playing music",
  run: async(client, message) => {
    const serverQueue = client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel first!").catch(console.error);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id) return message.reply("You need join same voice channel with me!")
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return serverQueue.textChannel.send(`${message.author} ▶ resumed the music!`).catch(console.error);
    }
    return message.reply("There is nothing playing.").catch(console.error);
  }
};
