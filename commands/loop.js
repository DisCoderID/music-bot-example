module.exports = {
  name: "loop",
  alias:["repeat"],
  description: "Toggle music loop",
  run: async(client, message) => {
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);
    const { channel } = message.member.voice;
    if(channel.id !== serverQueue.channel.id || !channel) return message.reply("You need join same voice channel with me!")
    // toggle from false to true and reverse
    serverQueue.loop = !serverQueue.loop;
    return serverQueue.textChannel
      .send(`Loop is now ${serverQueue.loop ? "**on**" : "**off**"}`)
      .catch(console.error);
  }
};