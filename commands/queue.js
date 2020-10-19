const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  alias: ["q"],
  description: "Show the music queue and now playing.",
  run: async(client, message) => {
    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);
    
    let queueEmbed = new MessageEmbed()
      .setTitle("Music Queue")
      .setDescription(serverQueue.songs.map((song, index) => `${index + 1}. ${song.title}`))
      .setColor("RANDOM")
      .setFooter("© Client Developer 2020")

    queueEmbed.setTimestamp();
    return message.channel.send(queueEmbed);
  }
};
