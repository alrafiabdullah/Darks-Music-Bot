module.exports = {
    name: "leave",
    description: "This is a leave command",
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send(`${message.member.displayName}, you need to be in a voice channel to execute this command!`);
        }

        await voiceChannel.leave();
    }
}