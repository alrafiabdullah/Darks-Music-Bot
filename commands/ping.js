module.exports = {
    name: "ping",
    description: "This is a ping command",
    execute(message, client) {
        message.channel.send(`${client.ws.ping}ms`);
    }
}