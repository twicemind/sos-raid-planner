import { SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, ButtonStyle, ButtonBuilder } from 'discord.js'

export class Button {
	create = (id, label, type) => {
		const getStyle = (type) => {
			switch (type) {
				case 'primary':
					return ButtonStyle.Primary
				case 'secondary':
					return ButtonStyle.Secondary
				case 'success':
					return ButtonStyle.Success
				case 'danger':
					return ButtonStyle.Danger
				case 'link':
					return ButtonStyle.Link
				default:
					return ButtonStyle.Primary
				}
			}

		return new ButtonBuilder()
			.setCustomId(id)
			.setLabel(label)
			.setStyle(getStyle(type))
	}
}

export class Modal {
	create = (title, description) => {
		return new ModalBuilder()
			.setCustomId(title)
			.setTitle(description)
	}
}

export class TextInput {
	create = (id, label, type) => {
		const getStyle = (type) => {
			switch (type) {
				case 'short':
					return TextInputStyle.Short
				case 'long':
					return TextInputStyle.Long
				default:
					return TextInputStyle.Short
				}
			}
		return new TextInputBuilder()
			.setCustomId(id)
			.setLabel(label)
			.setStyle(getStyle(type))
	}
}

export class ActionRow {
	create = () => {
		return new ActionRowBuilder()
	}
}

export class SlashCommand {
	constructor () {}
	create = (name, description) => {
		return new SlashCommandBuilder()
			.setName(name)
			.setDescription(description)
	}
}

export class Nickname {
	constructor () {}
	get = async (interaction) => {
		let nickname = 'not set'
		if (interaction.member.nickname !== null && interaction.member.nickname !== undefined){
			nickname = interaction.member.nickname
		} else {
			nickname = interaction.member.user.username
		}
		return nickname
	}
}