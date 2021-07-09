const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
    name: "gn;ldkfsgjh;ldsg",
    description: "This is a play command",
    async execute(message, args, client, Discord) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send(`${message.member.displayName}, you need to be in a voice channel to execute this command!`);
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) {
            return message.channel.send(`${message.member.displayName}, you do not have correct permision to execute this command!`);
        }
        if (!permissions.has("SPEAK")) {
            return message.channel.send(`${message.member.displayName}, you do not have correct permision to execute this command!`);
        }

        if (!args.length) {
            return message.channel.send(`${message.member.displayName}, please add a URL after play!`);
        }

        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) && videoResult.videos[0];
        };

        const video = await videoFinder(args.join(" "));

        if (video) {
            const stream = ytdl(video.url, { filter: "audioonly" });
            connection.play(stream, { seek: 0, volume: 1 })
                .on("finish", () => {
                    setTimeout(() => {
                        voiceChannel.leave();
                    }, 100000);
                });

            const audioEmbed = new Discord.MessageEmbed()
                .setColor(`${message.member.displayHexColor}`)
                .setTitle(`Now playing ***${video.title}***`)
                .addFields(
                    { name: "Duration", value: `${video.duration ? video.duration : 0}`, inline: true },
                    { name: "Requested By", value: `${message.member.displayName}`, inline: true }
                )
                .setThumbnail(video.thumbnail);

            await message.reply(audioEmbed);
        } else {
            message.channel.send("No video found!");
        }
    }
};