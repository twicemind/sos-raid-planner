import { ActionRow, Modal, TextInput, Nickname } from '../lib/discord.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import helper from '../lib/radr.rr.helper.js'
import { raid } from '../config.js'
import { Events } from 'discord.js'

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Raid Registration',
	async execute(interaction) {
		let nickname = await new Nickname().get(interaction)
		let participantsString = ''
		let reservesString = ''
		let messageEmbed

		if (interaction.customId === 'participate' || interaction.customId === 'reserve') {
			messageEmbed = await helper.getEmbet(interaction.message.embeds, raid.content.header)
		}

		if (interaction.customId === 'participate') {
			participantsString = await helper.edit(messageEmbed, nickname, raid.content.participant.header)
			reservesString = await helper.remove(messageEmbed, nickname, raid.content.reserve.header)
		} else if (interaction.customId === 'reserve') {
			reservesString = await helper.edit(messageEmbed, nickname, raid.content.reserve.header)
			participantsString = await helper.remove(messageEmbed, nickname, raid.content.participant.header)
		} else if (interaction.customId === 'userParticipate') {
			const modal = new Modal().create('AddUserModalParticipate', 'Add a User to participants')
			const txt = new TextInput().create('memberSelectionParticipate', 'Write member to add to participants', 'short')
			const row = new ActionRow().create().addComponents(txt)
			modal.addComponents(row)
			await interaction.showModal(modal)
		} else if (interaction.customId === 'userReserve') {
			const modal = new Modal().create('AddUserModalReserve', 'Add a User to reserve')
			const txt = new TextInput().create('memberSelectionReserve', 'Write member to add to reserve', 'short')
			const row = new ActionRow().create().addComponents(txt)
			modal.addComponents(row)
			await interaction.showModal(modal)
		}

		if (interaction.customId === 'participate' || interaction.customId === 'reserve') {
			let fields = []

			for (let i = 0; i < messageEmbed.fields.length; i++) {
				if (!messageEmbed.fields[i].name.includes(raid.content.participant.header) && !messageEmbed.fields[i].name.includes(raid.content.reserve.header)) {
					fields.push(messageEmbed.fields[i])
				}
			}

			fields.push({ name: raid.content.participant.header, value: participantsString, inline: false })
			fields.push({ name: raid.content.reserve.header, value: reservesString, inline: false })

			const config = new Options().message()
			config.title = raid.content.header
			config.description = raid.content.description
			config.color = new Color().get(raid.content.color)
			config.thumbnail = 'attachment://rr.png'
			config.fields = fields

			const embed = new Embed(config)

			await interaction.message.edit({ embeds: [embed] })
			await interaction.reply({ content: 'You have joined the raid!\n\n This message will be automatically deleted after 10 seconds', ephemeral: true })
			setTimeout(() => interaction.deleteReply(), 10000)
		}
	}
}