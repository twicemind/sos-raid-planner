import helper from '../lib/radr.cc.helper.js'
import { Events } from 'discord.js'
import { Nickname } from '../lib/discord.helper.js'
import { cc } from '../config.js'
import { Color, Embed, Options } from '../embed/embed.js'

async function sendReply(interaction, messageEmbed, fieldValues) {
	const config = new Options().message()
	config.title = cc.content.header
	config.description = cc.content.description
	config.color = new Color().get(cc.content.color)
	config.thumbnail = 'attachment://cc.png'

	let fields = []
	for (let i = 0; i < messageEmbed.fields.length; i++) {
		if (!messageEmbed.fields[i].name.trim().includes(cc.content.yes.header.trim()) && 
				!messageEmbed.fields[i].name.trim().includes(cc.content.yesbut.header.trim()) && 
				!messageEmbed.fields[i].name.trim().includes(cc.content.nope.header.trim())) {
			fields.push(messageEmbed.fields[i])
		}
	}

	fields.push(fieldValues.yes)
	fields.push(fieldValues.yesbut)
	fields.push(fieldValues.nope)

	config.fields = fields
	const embed = new Embed(config)

	await interaction.message.edit({ embeds: [embed] })
	await interaction.reply({ content: 'You have joined the cc!\n\n This message will be automatically deleted after 10 seconds', ephemeral: true })
	setTimeout(() => interaction.deleteReply(), 10000)
}

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Capital Clash Modal',
	async execute(interaction) {
		if (!interaction.isModalSubmit()) return

		if (interaction.customId === 'ModalCCYesUser' || 
				interaction.customId === 'ModalCCYesBut' || 
				interaction.customId === 'ModalCCYesButUser' || 
				interaction.customId === 'ModalCCNopeUser') {

			let fieldValues, extra
			
			let nickname = await new Nickname().get(interaction)
			const messageEmbed = await helper.getEmbet(interaction.message.embeds, cc.content.header)

			switch (interaction.customId) {
				case 'ModalCCYesUser':
					nickname = interaction.fields.getTextInputValue('memberModalCCNickname')
					fieldValues = {
						yes: { 
							name: cc.content.yes.header, 
							value: await helper.edit(messageEmbed, nickname, cc.content.yes.header), 
							inline: false },
						yesbut: {
							name: cc.content.yesbut.header,
							value: await helper.remove(messageEmbed, nickname, cc.content.yesbut.header),
							inline: false
						},
						nope: {
							name: cc.content.nope.header,
							value: await helper.remove(messageEmbed, nickname, cc.content.nope.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
				case 'ModalCCYesBut':
					extra = ' [ from: ' + 
						interaction.fields.getTextInputValue('memberModalCCFrom') + 'UTC to: ' + 
						interaction.fields.getTextInputValue('memberModalCCTo') + 'UTC ]'
					fieldValues = {
						yes: { 
							name: cc.content.yes.header, 
							value: await helper.remove(messageEmbed, nickname, cc.content.yes.header), 
							inline: false },
						yesbut: {
							name: cc.content.yesbut.header,
							value: await helper.edit(messageEmbed, nickname, cc.content.yesbut.header, extra),
							inline: false
						},
						nope: {
							name: cc.content.nope.header,
							value: await helper.remove(messageEmbed, nickname, cc.content.nope.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
				case 'ModalCCYesButUser':
					nickname = interaction.fields.getTextInputValue('memberModalCCNickname')
					extra = ' [ from: ' + 
						interaction.fields.getTextInputValue('memberModalCCFrom') + 'UTC to: ' + 
						interaction.fields.getTextInputValue('memberModalCCTo') + 'UTC ]'
					fieldValues = {
						yes: { 
							name: cc.content.yes.header, 
							value: await helper.remove(messageEmbed, nickname, cc.content.yes.header), 
							inline: false },
						yesbut: {
							name: cc.content.yesbut.header,
							value: await helper.edit(messageEmbed, nickname, cc.content.yesbut.header, extra),
							inline: false
						},
						nope: {
							name: cc.content.nope.header,
							value: await helper.remove(messageEmbed, nickname, cc.content.nope.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
				case 'ModalCCNopeUser':
					nickname = interaction.fields.getTextInputValue('memberModalCCNopeNickname')
					fieldValues = {
						yes: { 
							name: cc.content.yes.header, 
							value: await helper.remove(messageEmbed, nickname, cc.content.yes.header), 
							inline: false },
						yesbut: {
							name: cc.content.yesbut.header,
							value: await helper.remove(messageEmbed, nickname, cc.content.yesbut.header),
							inline: false
						},
						nope: {
							name: cc.content.nope.header,
							value: await helper.edit(messageEmbed, nickname, cc.content.nope.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
			}
		}
	}
}