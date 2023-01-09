import helper from '../lib/radr.rr.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { raid } from '../config.js'
import { Events } from 'discord.js'

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Raid Modal',
	async execute(interaction) {
		let nickname = ''
		let participantsString = ''
		let reservesString = ''
		let messageEmbed

		if (!interaction.isModalSubmit()) return
		if (interaction.customId === 'AddUserModalParticipate' || interaction.customId === 'AddUserModalReserve') {
			messageEmbed = await helper.getEmbet(interaction.message.embeds, raid.content.header)
		}
		if (interaction.customId === 'AddUserModalParticipate') {
			nickname = interaction.fields.getTextInputValue('memberSelectionParticipate')
			if (nickname !== '') {
				participantsString = await helper.edit(messageEmbed, nickname, raid.content.participant.header)
				reservesString = await helper.remove(messageEmbed, nickname, raid.content.reserve.header)
			}
		} else if (interaction.customId === 'AddUserModalReserve') {
			nickname = interaction.fields.getTextInputValue('memberSelectionReserve')
			if (nickname !== '') {
				reservesString = await helper.edit(messageEmbed, nickname, raid.content.reserve.header)
				participantsString = await helper.remove(messageEmbed, nickname, raid.content.participant.header)
			}
		}

		if (interaction.customId === 'AddUserModalParticipate' || interaction.customId === 'AddUserModalReserve') {
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