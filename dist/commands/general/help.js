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
const discord_js_1 = require("discord.js");
const defaultEmbed_1 = require("../../modules/defaultEmbed");
const emojis_json_1 = __importDefault(require("../../data/emojis.json"));
const media_json_1 = __importDefault(require("../../data/media.json"));
const helpText = `Welcome to the help menu! Here you can find a list of commands and their descriptions.
This bot was created by reimakesgames#3672 as a joke, because ${emojis_json_1.default.default}

**__General Commands__**
\`/help\` - Shows this menu
\`/ping\` - Shows the bot's ping

**__Administrator Only Commands__**
\`/hell\` - The ${emojis_json_1.default.default}ening (reacts to sent messages in the channel with ${emojis_json_1.default.default})

`;
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows a list of commands"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new defaultEmbed_1.DefaultEmbed("Help")
                .setDescription(helpText)
                .setThumbnail(media_json_1.default.routine)
                .build();
            yield interaction.reply({ embeds: [embed] });
        });
    }
};
