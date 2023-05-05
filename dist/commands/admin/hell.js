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
const emojis_json_1 = __importDefault(require("../../data/emojis.json"));
const media_json_1 = __importDefault(require("../../data/media.json"));
const defaultEmbed_1 = require("../../modules/defaultEmbed");
function messageHandler(message, channel, interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (message.channel.id === channel.id) {
            if (message.content.startsWith("stop")) {
                interaction.client.off(discord_js_1.Events.MessageCreate, messageHandler);
                console.warn(`[COMMAND]: ${interaction.user.tag} stopped the hell command.`);
                return;
            }
            ;
            yield message.react(emojis_json_1.default.default);
        }
    });
}
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("hell")
        .setDescription("megabyte's worst nightmare"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.member.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) {
                // Since only admins can use this command, we can assume that the bot has permission to react to messages in the channel.
                // If the bot doesn't have permission to react to messages in the channel, it should throw an error.
                // This is because the bot will only react to messages that are sent after the command is used.
                console.warn(`[COMMAND]: ${interaction.user.tag} used the hell command.`);
                const embed = new defaultEmbed_1.DefaultEmbed(`The ${emojis_json_1.default.default}ening`)
                    .setDescription(`The ${emojis_json_1.default.default}ening has begun.`)
                    .setThumbnail(media_json_1.default.routine)
                    .setImage(media_json_1.default.routine)
                    .build();
                yield interaction.reply({ embeds: [embed] });
                const channel = interaction.channel;
                messageHandler(interaction.message, channel, interaction);
                interaction.client.on(discord_js_1.Events.MessageCreate, messageHandler);
            }
            else {
                const embed = new defaultEmbed_1.DefaultEmbed("Failure")
                    .setDescription(`Only people worthy of the ${emojis_json_1.default.default}ening can use this command`)
                    .setThumbnail(media_json_1.default.routine)
                    .setImage(media_json_1.default.routine)
                    .build();
                yield interaction.reply({ embeds: [embed] });
            }
        });
    }
};
