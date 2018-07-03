const Discord = require("discord.js");
const prefix = "-";

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", () => {
	console.log("--------------------------------------")
	console.log(`Bot online | Logged in as ${bot.user.username}#${bot.user.discriminator}`)
	console.log("--------------------------------------")
	bot.user.setStatus('dnd')
	bot.user.setPresence({ game: { name: 'for updates', type: 3 } })
});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(!command.startsWith(prefix)) return;

	if(command === `${prefix}ping`) {
		message.channel.send(`:stopwatch: ${bot.ping}ms`)
	}

	if(command === `${prefix}update`) {
		if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send ("You do not have the right permissions!");

		var commandud = message.content.split(" ")[0].slice(prefix.length);
		var params = message.content.split(" ").slice(1);

		let embed = new Discord.RichEmbed()
		.setTimestamp(timestamp = new Date())
		.setDescription(args.slice(1).join(" "))
		.setTitle(args[0])
		.setColor("#00BDFF")
		.setTimestamp()
		.setFooter(`Issued by ${message.author.username}`);

		message.guild.channels.find('name', 'news').send(embed);
		message.channel.send("Update posted <:success:463539522475655172>");
	}
});

bot.login(process.env.BOT_TOKEN);
