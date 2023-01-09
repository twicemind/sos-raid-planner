import { EmbedBuilder } from 'discord.js'
import assert from 'assert'

export class Options {
	message () {
		return {
			color: new Color().blue,
			title: 'Default Title',
			description: 'Description',
			fields: [],
			thumbnail: ''
		}
	}
	field () {
		return {
			fieldTitle: 'Default Title',
			fieldValue: 'Description',
			fieldInline: false
		}
	}
}

export class Color {
	red () {
		return '#EF4444'
	}
	green () {
		return '#22C55E'
	}
	blue () {
		return '#06B6D4'
	}
	orange () {
		return '#F97316'
	}
	yellow () {
		return '#F59E0B'
	}
	get(color) {
		switch (color) {
			case 'red':
				return this.red()
			case 'green':
				return this.green()
			case 'blue':
				return this.blue()
			case 'orange':
				return this.orange()
			case 'yellow':
				return this.yellow()
			default:
				return this.blue()
		}
	}
}

export class Embed {
	constructor(config = {}) {
		const {
			color,
			title,
			description,
			fields,
			thumbnail
		} = Object.assign({}, new Options().message(), config)
	
		assert.equal(typeof color, 'string', 'color must be a string')
		assert.ok(title, 'title must be defined')
		assert.equal(typeof description, 'string', 'title must be a string')
		assert.equal(typeof fields, 'object', 'fields must be an Array of fields')
		assert.equal(typeof thumbnail, 'string', 'thumbnail must be a string')

		const addField = async (config = {}) => {
			const {
				fieldTitle,
				fieldValue,
				fieldInline
			} = Object.assign({}, new Options().field(), config)
		
			assert.ok(fieldTitle, 'title must be defined')
			assert.ok(fieldValue, 'value must be defined')
			assert.equal(typeof fieldInline, 'boolean', 'inline must be a boolean')

			this.embed.addFields({ name: fieldTitle, value: fieldValue, inline: fieldInline})
		}

		this.embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(title)
			.setTimestamp()
			//.setThumbnail(thumbnail)
			.setDescription(config.description)

			if(config.thumbnail) {
				this.embed.setThumbnail(thumbnail)
			}

		if (fields) {
			for (const field of fields) {
				const fieldTitle = field.name
				const fieldValue = field.value
				const fieldInline = field.inline
	
				addField({ fieldTitle, fieldValue, fieldInline })
			}
		}
		return this.embed
	}
}