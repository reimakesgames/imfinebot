const fs = require('node:fs');
const path = require('node:path');

const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const emojis = require('./emojis.json');

const buildInfo = require('./buildInfo.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

console.warn(`[RUNTIME]: Loading commands...`);
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
console.warn(`[RUNTIME]: Loaded commands.`);

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: `${emojis.default} There was an error while executing this command!`, ephemeral: false });
		} else {
			await interaction.reply({ content: `${emojis.default} There was an error while executing this command!`, ephemeral: false });
		}
	}
});

client.once(Events.ClientReady, activeClient => {
	console.warn(`[RUNTIME]: ${activeClient.user.tag} is now online.`);
	activeClient.user.setPresence({
		activities: [
			{
				name: "Gurgy Killer 2000",
				type: ActivityType.Playing
			}
		],
		status: "online"
	});
});

buildInfo.buildNumber += 1;
fs.writeFileSync('./buildInfo.json', JSON.stringify(buildInfo, null, 4));

client.login(token);
