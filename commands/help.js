module.exports = {
    name: "help",
    description: "This is a help command",
    execute(message, args, cmd, client, Discord) {
        const newEmbed = new Discord.MessageEmbed()
            .setColor(`${message.member.displayHexColor}`)
            .setTitle("Help Message")
            .setDescription("All the commands of Dark's Music Bot! Please add % beforehand.")
            .addFields(
                { name: "ping", value: "Shows shard connection time", inline: true },
                { name: "help", value: "Shows this message", inline: true },
                { name: "play", value: "Plays a song from YouTube. Add URL or Title.", inline: true },
                { name: "skip", value: "Skips the current song", inline: true },
                { name: "stop", value: "Stops the song queue", inline: true },
            )
            .setThumbnail(message.member.user.avatarURL() !== null ? message.member.user.avatarURL() : message.member.user.defaultAvatarURL)
            .setFooter(`Requested by: ${message.member.displayName}`);

        message.channel.send(newEmbed);
    }
}