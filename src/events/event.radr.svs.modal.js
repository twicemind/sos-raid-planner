import helper from '../lib/radr.svs.helper.js'
import { Events } from 'discord.js'
import { Nickname } from '../lib/discord.helper.js'
import { svs } from '../config.js'
import { Color, Embed, Options } from '../embed/embed.js'


export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'SvS Modal',
	async execute(interaction) {
		if (!interaction.isModalSubmit()) return

		if (interaction.customId === 'AddSVSYes' || interaction.customId === 'AddSVSYesBut' || interaction.customId === 'AddSVSNopeUserAdd' || interaction.customId === 'AddSVSYesButUserAdd' || interaction.customId === 'AddSVSYesUserAdd') {
			
			let nickname = await new Nickname().get(interaction)
			let hqText = ''
			let timeTextFrom = ''
			let timeTextTo = ''
			let messageEmbed = await helper.getEmbet(interaction.message.embeds, svs.content.header)

			let fields = []

			for (let i = 0; i < messageEmbed.fields.length; i++) {
				if (!messageEmbed.fields[i].name.trim().includes(svs.content.yes.header.trim()) && 
						!messageEmbed.fields[i].name.trim().includes(svs.content.yesbut.header.trim()) && 
						!messageEmbed.fields[i].name.trim().includes(svs.content.nope.header.trim())) {
					fields.push(messageEmbed.fields[i])
				}
			}

			switch (interaction.customId) {
				case 'AddSVSYes':
					hqText= interaction.fields.getTextInputValue('modalTxTSVSHqLevelYes')
					fields.push({ 
						name: svs.content.yes.header, 
						value: await helper.edit(messageEmbed, nickname, svs.content.yes.header, ' [ HQ: ' + hqText.toUpperCase() + ' ]'), 
						inline: false 
					})
					fields.push({ 
						name: svs.content.yesbut.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.yesbut.header),
						inline: false
					})
					fields.push({
						name: svs.content.nope.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.nope.header),
						inline: false
					})
					break
				case 'AddSVSYesUserAdd':
					nickname = interaction.fields.getTextInputValue('modalTxTSVSUserAddYes')
					hqText= interaction.fields.getTextInputValue('modalTxTSVSHqLevelYesUser')
					fields.push({ 
						name: svs.content.yes.header, 
						value: await helper.edit(messageEmbed, nickname, svs.content.yes.header, ' [ HQ: ' + hqText.toUpperCase() + ' ]'), 
						inline: false 
					})
					fields.push({ 
						name: svs.content.yesbut.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.yesbut.header),
						inline: false
					})
					fields.push({
						name: svs.content.nope.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.nope.header),
						inline: false
					})
					break
				case 'AddSVSYesBut':
					hqText= interaction.fields.getTextInputValue('modalTxTSVSHqLevelYesBut')
					timeTextFrom = interaction.fields.getTextInputValue('modalTxTSVSTimeFromYesBut')
					timeTextTo = interaction.fields.getTextInputValue('modalTxTSVSTimeToYesBut')
					fields.push({
						name: svs.content.yes.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.yes.header),
						inline: false
					})
					fields.push({
						name: svs.content.yesbut.header,
						value: await helper.edit(messageEmbed, nickname, svs.content.yesbut.header, ' [ HQ: ' + hqText.toUpperCase() + ' ] [ from: ' + timeTextFrom + 'UTC to: ' + timeTextTo + 'UTC ]'),
						inline: false
					})
					fields.push({
						name: svs.content.nope.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.nope.header),
						inline: false
					})
					break
				case 'AddSVSYesButUserAdd':
					hqText= interaction.fields.getTextInputValue('modalTxTSVSHqLevelYesButUser')
					nickname = interaction.fields.getTextInputValue('modalTxTSVSUserAddYesBut')
					timeTextFrom = interaction.fields.getTextInputValue('modalTxTSVSTimeFromYesButUser')
					timeTextTo = interaction.fields.getTextInputValue('modalTxTSVSTimeToYesButUser')
					fields.push({
						name: svs.content.yes.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.yes.header),
						inline: false
					})
					fields.push({
						name: svs.content.yesbut.header,
						value: await helper.edit(messageEmbed, nickname, svs.content.yesbut.header, ' [ HQ: ' + hqText.toUpperCase() + ' ] [ from: ' + timeTextFrom + 'UTC to: ' + timeTextTo + 'UTC ]'),
						inline: false
					})
					fields.push({
						name: svs.content.nope.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.nope.header),
						inline: false
					})
					break
				case 'AddSVSNopeUserAdd':
					nickname = interaction.fields.getTextInputValue('modalTxTSVSUserAddNope')
					fields.push({
						name: svs.content.yes.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.yes.header),
						inline: false
					})
					fields.push({
						name: svs.content.yesbut.header,
						value: await helper.remove(messageEmbed, nickname, svs.content.yesbut.header),
						inline: false
					})
					fields.push({
						name: svs.content.nope.header,
						value: await helper.edit(messageEmbed, nickname, svs.content.nope.header),
						inline: false
					})
					break
			}

			const config = new Options().message()
			config.title = svs.content.header
			config.description = svs.content.description
			config.color = new Color().get(svs.content.color)
			config.thumbnail = 'attachment://ss.png'
			config.fields = fields

			const embed = new Embed(config)

			await interaction.message.edit({ embeds: [embed] })
			await interaction.reply({ content: 'You have joined the svs!\n\n This message will be automatically deleted after 10 seconds', ephemeral: true })
			setTimeout(() => interaction.deleteReply(), 10000)
		}
	}
}