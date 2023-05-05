"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEmbed = void 0;
const discord_js_1 = require("discord.js");
const colors_json_1 = __importDefault(require("../data/colors.json"));
const buildInfo_json_1 = __importDefault(require("../data/buildInfo.json"));
class DefaultEmbed {
    constructor(topic) {
        this.embed = new discord_js_1.EmbedBuilder()
            .setColor(colors_json_1.default.lighterBlue)
            .setTitle(`${topic}`)
            .setDescription(`This is an empty embed, which contains text that explains that this embed is empty. Congratulations!`)
            .setFooter({
            text: `${buildInfo_json_1.default.appShortName} v${buildInfo_json_1.default.version}.b${buildInfo_json_1.default.buildNumber}`
        })
            .setTimestamp();
    }
    setDescription(description) {
        this.embed.setDescription(description);
        return this;
    }
    setThumbnail(thumbnail) {
        this.embed.setThumbnail(thumbnail);
        return this;
    }
    setImage(image) {
        this.embed.setImage(image);
        return this;
    }
    setAuthor(options) {
        this.embed.setAuthor(options);
        return this;
    }
    setFooter(footer) {
        this.embed.setFooter(footer);
        return this;
    }
    setColor(color) {
        this.embed.setColor(color);
        return this;
    }
    setTitle(title) {
        this.embed.setTitle(title);
        return this;
    }
    setTimestamp(timestamp) {
        this.embed.setTimestamp(timestamp);
        return this;
    }
    setURL(url) {
        this.embed.setURL(url);
        return this;
    }
    addFields(...fields) {
        this.embed.addFields(fields);
        return this;
    }
    spliceFields(index, deleteCount, ...fields) {
        this.embed.spliceFields(index, deleteCount, ...fields);
        return this;
    }
    setFields(fields) {
        this.embed.setFields(fields);
        return this;
    }
    toJSON() {
        return this.embed.toJSON();
    }
    build() {
        return this.embed;
    }
}
exports.DefaultEmbed = DefaultEmbed;
