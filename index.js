const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if (command.data && command.execute) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`Invalid command file: ${filePath}`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	c.user.setPresence({
		activities: [
			{
				name: "gurgy killer 2000",
				type: ActivityType.Playing
			}
		],
		status: 'dnd'
	})

	c.on(Events.MessageCreate, message => {
		console.log(`${message.author.tag} in #${message.channel.name} said ${message.content}`);
		if (message.author.bot) return;
		if (message.content.toLowerCase().includes('fine')) {
			message.react('1100034698069151754');
		}
	});
	c.on(Events.MessageDelete, message => {
		console.log(`Message deleted in #${message.channel.name}: ${message.content}`);
	});
});

client.login(token);
