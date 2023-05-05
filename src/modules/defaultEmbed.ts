import { EmbedBuilder } from "discord.js";

import colors from "../../colors.json";
import buildInfo from "../../buildInfo.json";

export type DefaultEmbed = EmbedBuilder;

export class defaultEmbed extends EmbedBuilder {
	constructor(topic: string) {
		super();
		this.setColor(colors.lighterBlue as `#${string}`);
		this.setTitle(`${topic}`);
		this.setDescription(`This is an empty embed, which contains text that explains that this embed is empty. Congratulations!`);
		this.setFooter({
			text: `${buildInfo.appShortName} v${buildInfo.version}.b${buildInfo.buildNumber}`
		});
		this.setTimestamp();
	}
}
