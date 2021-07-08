const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = "%";

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once("ready", () => {
    client.user.setActivity({ name: "With DarkRafe's Life (¬‿¬)", type: "PLAYING" });
    console.log(`Logged in as ${client.user.tag}!`);
}); //1625736568924

client.on("guildMemberAdd", member => {
    const welcomeEmbed = new Discord.MessageEmbed()
        .setColor(`${member.guild.owner.displayHexColor}`)
        .setTitle(":confetti_ball: Welcome Message From Dark's Music Bot! :tada:")
        .setDescription(`On behalf of ${member.guild.name}`)
        .addFields(
            { name: "Owner", value: `${member.guild.owner.displayName}`, inline: true },
            { name: "Region", value: `${member.guild.region.toUpperCase()}`, inline: true },
            { name: "AFK Channel", value: `${member.guild.afkChannel}`, inline: true },
            { name: "Joined At", value: `${member.guild.joinedAt}` },
            { name: "(❁´◡`❁)", value: "Thank you for joining us. Enjoy your stay!" }
        )
        .setThumbnail(member.guild.bannerURL())
        .setFooter("Looking forward to meeting you!");
    member.send(welcomeEmbed);
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {
        command.execute(message, args, cmd, client, Discord);
    } catch (error) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor("#dc143c")
            .setTitle("Error!!!")
            .setThumbnail("https://www.freeiconspng.com/uploads/shiny-metal-red-error-image-designs-1.png")
            .setDescription("There's an error occurred from the server side!")
            .setFooter("Plese contact DarkRafe#2367. Thank you.");
        message.channel.send(errorEmbed);

    }
});

client.login(process.env.TOKEN);
