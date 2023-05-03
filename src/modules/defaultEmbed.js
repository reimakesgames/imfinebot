const colors =  require("../../colors.json");
const buildInfo = require("../../buildInfo.json");

const { EmbedBuilder } = require("discord.js");

class defaultEmbed extends EmbedBuilder {
	constructor(topic) {
		super();
		this.setColor(colors.lighterBlue);
		this.setTitle(`${topic}`);
		this.setDescription(`This is an empty embed, which contains text that explains that this embed is empty. Congratulations!`);
		this.setFooter({
			text: `${buildInfo.appShortName} v${buildInfo.version}.b${buildInfo.buildNumber}`
		});
		this.setTimestamp();
	}
}

module.exports = defaultEmbed;
