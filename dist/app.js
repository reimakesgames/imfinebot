"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const emojis_json_1 = __importDefault(require("./data/emojis.json"));
const buildInfo_json_1 = __importDefault(require("./data/buildInfo.json"));
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] });
var commands = new discord_js_1.Collection();
console.warn(`[RUNTIME]: Loading commands...`);
const foldersPath = node_path_1.default.join(__dirname, 'commands');
const commandFolders = node_fs_1.default.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = node_path_1.default.join(foldersPath, folder);
    const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    console.log(`[RUNTIME]: Loading commands from ${commandsPath}`);
    for (const file of commandFiles) {
        const filePath = node_path_1.default.join(commandsPath, file);
        const command = require(filePath);
        console.log(`[RUNTIME]: Loading command ${filePath}`);
        if (command.data && command.execute) {
            commands.set(command.data.name, command);
        }
        else {
            console.log(`Invalid command file: ${filePath}`);
        }
    }
}
console.warn(`[RUNTIME]: Loaded commands.`);
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    const command = commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        yield command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            yield interaction.followUp({ content: `${emojis_json_1.default.default} There was an error while executing this command!`, ephemeral: false });
        }
        else {
            yield interaction.reply({ content: `${emojis_json_1.default.default} There was an error while executing this command!`, ephemeral: false });
        }
    }
}));
client.once(discord_js_1.Events.ClientReady, activeClient => {
    console.warn(`[RUNTIME]: ${activeClient.user.tag} is now online.`);
    activeClient.user.setPresence({
        activities: [
            {
                name: "Gurgy Killer 2000",
                type: discord_js_1.ActivityType.Playing
            }
        ],
        status: "online"
    });
});
buildInfo_json_1.default.buildNumber += 1;
node_fs_1.default.writeFileSync('src/data/buildInfo.json', JSON.stringify(buildInfo_json_1.default, null, 4));
client.login(process.env.TOKEN);
