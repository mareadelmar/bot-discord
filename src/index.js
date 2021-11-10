const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

// login
client.login(process.env.token);

// escucha la conexión con el canal
client.on("ready", () => {
	console.log("contectado, wachx");
});

// escucha a miembros nuevos
client.on("guildMemberAdd", member => {
	const channel = member.guild.channels.cache.get(process.env.CHANNEL_ID);
	const welcomeMessage = `Bienvenide, <@${member.id}> 🎠`;
	channel.send(welcomeMessage);
});

client.on("message", message => {
	console.log(message.content, message.channel.name, message.author.username);

	// ignora mensajes del bot
	if (message.author.id === process.env.BOT_ID) return;

	// responde a un usuario
	const { content } = message;
	if (content === "!holi") {
		console.log("autor:", message.author.id);
		message.reply("holis a vos");
	}

	// responde con mensaje directo
	if (content === "!ping") {
		client.users.fetch(message.author.id).then(user => {
			user.send("pong");
		});
	}

	// responde un mensaje general
	if (content === "general") {
		message.channel.send("Esto es un mensaje general y está pasando ahora");
	}

	/**
	 * eliminar un mensaje:
	 * message.delete({ timeout: 3000})
	 */
});
