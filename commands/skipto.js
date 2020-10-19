module.exports = {
  name: "skipto",
  alias:["st","jump"],
  description: "Skip to the selected queue number",
  run: async(client, message, args) => {
    if (!args.length) return message.reply(`Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`);

    const queue = client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);

    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 2);
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ skipped ${args[0] - 1} songs`).catch(console.error);
  }
};