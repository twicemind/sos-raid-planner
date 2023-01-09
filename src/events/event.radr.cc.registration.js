import helper from '../lib/radr.cc.helper.js'
import { Modal, TextInput, ActionRow, Nickname } from '../lib/discord.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { Events } from 'discord.js'
import { cc } from '../config.js'

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

async function showModal(interaction, modalName, modalDescr, components) {
	const modal = new Modal().create(modalName, modalDescr, components)
	for (let i = 0; i < components.length; i++) {
		modal.addComponents(components[i])
	}
	await interaction.showModal(modal)
}

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Capital Clash Registration',
	async execute(interaction) {
		if (interaction.customId === 'ccyes' || 
				interaction.customId === 'ccnope' ||
				interaction.customId === 'ccyesbut' ||
				interaction.customId === 'ccyesbutUser' ||
				interaction.customId === 'ccyesUser' ||
				interaction.customId === 'ccnopeUser') {
			
			let components, fieldValues
			
			let nickname = await new Nickname().get(interaction)
			const messageEmbed = await helper.getEmbet(interaction.message.embeds, cc.content.header)
			
			switch (interaction.customId) {
				case 'ccyes':
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
				case 'ccyesUser':
					components = [
						new ActionRow().create().addComponents(new TextInput().create('memberModalCCNickname', 'Nickname', 'short'))
					]
					await showModal(interaction, 'ModalCCYesUser', 'Add nickname', components)
					break
				case 'ccnope':
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
				case 'ccnopeUser':
					components = [
						new ActionRow().create().addComponents(new TextInput().create('memberModalCCNopeNickname', 'Nickname', 'short'))
					]
					await showModal(interaction, 'ModalCCNopeUser', 'Add nickname', components)
					break
				case 'ccyesbut':
					components = [
						new ActionRow().create().addComponents(new TextInput().create('memberModalCCFrom', 'Time from (UTC)', 'short')),
						new ActionRow().create().addComponents(new TextInput().create('memberModalCCTo', 'Time to (UTC)', 'short'))
					]
					await showModal(interaction, 'ModalCCYesBut', 'Add your Time', components)
					break
				case 'ccyesbutUser':
					components = [
						new ActionRow().create().addComponents(new TextInput().create('memberModalCCNickname', 'Nickname', 'short')),
						new ActionRow().create().addComponents(new TextInput().create('memberModalCCFrom', 'Time from (UTC)', 'short')),
						new ActionRow().create().addComponents(new TextInput().create('memberModalCCTo', 'Time to (UTC)', 'short'))
					]
					await showModal(interaction, 'ModalCCYesButUser', 'Add nickname and time', components)					
					break
			}
		}
	}
}