import { APIEmbed, APIEmbedField, EmbedAuthorOptions, EmbedBuilder, EmbedFooterOptions, RestOrArray } from "discord.js";

import colors from "../data/colors.json";
import buildInfo from "../data/buildInfo.json";

export class DefaultEmbed {
	private embed: EmbedBuilder;

	public constructor(topic: string) {
		this.embed = new EmbedBuilder()
			.setColor(colors.lighterBlue as `#${string}`)
			.setTitle(`${topic}`)
			.setDescription(`This is an empty embed, which contains text that explains that this embed is empty. Congratulations!`)
			.setFooter({
				text: `${buildInfo.appShortName} v${buildInfo.version}.b${buildInfo.buildNumber}`
			})
			.setTimestamp();
	}

	public setDescription(description: string): this {
		this.embed.setDescription(description);
		return this;
	}

	public setThumbnail(thumbnail: string): this {
		this.embed.setThumbnail(thumbnail);
		return this;
	}

	public setImage(image: string): this {
		this.embed.setImage(image);
		return this;
	}

	public setAuthor(options: EmbedAuthorOptions): this {
		this.embed.setAuthor(options);
		return this;
	}

	public setFooter(footer: EmbedFooterOptions): this {
		this.embed.setFooter(footer);
		return this;
	}

	public setColor(color: `#${string}`): this {
		this.embed.setColor(color);
		return this;
	}

	public setTitle(title: string): this {
		this.embed.setTitle(title);
		return this;
	}

	public setTimestamp(timestamp?: Date | number): this {
		this.embed.setTimestamp(timestamp);
		return this;
	}

	public setURL(url: string): this {
		this.embed.setURL(url);
		return this;
	}

	public addFields(...fields: APIEmbedField[]): this {
		this.embed.addFields(fields);
		return this;
	}

	public spliceFields(index: number, deleteCount: number, ...fields: APIEmbedField[]): this {
		this.embed.spliceFields(index, deleteCount, ...fields);
		return this;
	}

	public setFields(fields: APIEmbedField[]): this {
		this.embed.setFields(fields);
		return this;
	}

	public toJSON(): APIEmbed {
		return this.embed.toJSON();
	}

	public build(): EmbedBuilder {
		return this.embed;
	}
}
