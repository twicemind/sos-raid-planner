import { Events } from 'discord.js'
import helper from '../lib/radr.buff.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { Nickname } from '../lib/discord.helper.js'
import { buff } from '../config.js'

async function sendReply(interaction,messageEmbed, fieldValues) {
	const config = new Options().message()
	config.title = buff.content.header
	config.description = buff.content.description
	config.color = new Color().get(buff.content.color)
	config.thumbnail = 'attachment://buff.png'

	let fields = []
	for (let i = 0; i < messageEmbed.fields.length; i++) {
		if (!messageEmbed.fields[i].name.trim().includes(buff.content.options.cs.header.trim()) && 
				!messageEmbed.fields[i].name.trim().includes(buff.content.options.mo.header.trim()) && 
				!messageEmbed.fields[i].name.trim().includes(buff.content.options.mm.header.trim()) &&
				!messageEmbed.fields[i].name.trim().includes(buff.content.options.ww.header.trim()) &&
				!messageEmbed.fields[i].name.trim().includes(buff.content.options.if.header.trim()) &&
				!messageEmbed.fields[i].name.trim().includes(buff.content.options.pa.header.trim())) {
			fields.push(messageEmbed.fields[i])
		}
	}

	fields.push(fieldValues.chiefStrat)
	fields.push(fieldValues.mightyOx)
	fields.push(fieldValues.masterMedic)
	fields.push(fieldValues.warWolf)
	fields.push(fieldValues.ironFist)
	fields.push(fieldValues.patriot)

	config.fields = fields
	const embed = new Embed(config)

	await interaction.message.edit({ embeds: [embed] })
	await interaction.reply({ content: 'You have tagged your buff!\n\n This message will be automatically deleted after 10 seconds', ephemeral: true })
	setTimeout(() => interaction.deleteReply(), 10000)
}

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Raid Buff Registration',
	async execute(interaction) {
		if (interaction.customId === 'buffChiefStrat' || 
				interaction.customId === 'buffMightyOx' || 
				interaction.customId === 'buffMasterMedic' || 
				interaction.customId === 'buffWarWolf' || 
				interaction.customId === 'buffIronFist' || 
				interaction.customId === 'buffPatriot') {
	
			let fieldValues
	
			let nickname = await new Nickname().get(interaction)
			const messageEmbed = await helper.getEmbet(interaction.message.embeds, buff.content.header)

			switch (interaction.customId) {
				case 'buffChiefStrat':
					fieldValues = {
						chiefStrat: {
							name: buff.content.options.cs.header,
							value: await helper.edit(messageEmbed, nickname, buff.content.options.cs.header),
							inline: false
						},
						mightyOx: {
							name: buff.content.options.mo.header,
							value: await helper.get(messageEmbed, buff.content.options.mo.header),
							inline: false
						},
						masterMedic: {
							name: buff.content.options.mm.header,
							value: await helper.get(messageEmbed, buff.content.options.mm.header),
							inline: false
						},
						warWolf: {
							name: buff.content.options.ww.header,
							value: await helper.get(messageEmbed, buff.content.options.ww.header),
							inline: false
						},
						ironFist: {
							name: buff.content.options.if.header,
							value: await helper.get(messageEmbed, buff.content.options.if.header),
							inline: false
						},
						patriot: {
							name: buff.content.options.pa.header,
							value: await helper.get(messageEmbed, buff.content.options.pa.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
				case 'buffMightyOx':
					fieldValues = {
						chiefStrat: {
							name: buff.content.options.cs.header,
							value: await helper.get(messageEmbed, buff.content.options.cs.header),
							inline: false
						},
						mightyOx: {
							name: buff.content.options.mo.header,
							value: await helper.edit(messageEmbed, nickname, buff.content.options.mo.header),
							inline: false
						},
						masterMedic: {
							name: buff.content.options.mm.header,
							value: await helper.get(messageEmbed, buff.content.options.mm.header),
							inline: false
						},
						warWolf: {
							name: buff.content.options.ww.header,
							value: await helper.get(messageEmbed, buff.content.options.ww.header),
							inline: false
						},
						ironFist: {
							name: buff.content.options.if.header,
							value: await helper.get(messageEmbed, buff.content.options.if.header),
							inline: false
						},
						patriot: {
							name: buff.content.options.pa.header,
							value: await helper.get(messageEmbed, buff.content.options.pa.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
				case 'buffMasterMedic':
					fieldValues = {
						chiefStrat: {
							name: buff.content.options.cs.header,
							value: await helper.get(messageEmbed, buff.content.options.cs.header),
							inline: false
						},
						mightyOx: {
							name: buff.content.options.mo.header,
							value: await helper.get(messageEmbed, buff.content.options.mo.header),
							inline: false
						},
						masterMedic: {
							name: buff.content.options.mm.header,
							value: await helper.edit(messageEmbed, nickname, buff.content.options.mm.header),
							inline: false
						},
						warWolf: {
							name: buff.content.options.ww.header,
							value: await helper.get(messageEmbed, buff.content.options.ww.header),
							inline: false
						},
						ironFist: {
							name: buff.content.options.if.header,
							value: await helper.get(messageEmbed, buff.content.options.if.header),
							inline: false
						},
						patriot: {
							name: buff.content.options.pa.header,
							value: await helper.get(messageEmbed, buff.content.options.pa.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
				case 'buffWarWolf':
					fieldValues = {
						chiefStrat: {
							name: buff.content.options.cs.header,
							value: await helper.get(messageEmbed, buff.content.options.cs.header),
							inline: false
						},
						mightyOx: {
							name: buff.content.options.mo.header,
							value: await helper.get(messageEmbed, buff.content.options.mo.header),
							inline: false
						},
						masterMedic: {
							name: buff.content.options.mm.header,
							value: await helper.get(messageEmbed, buff.content.options.mm.header),
							inline: false
						},
						warWolf: {
							name: buff.content.options.ww.header,
							value: await helper.edit(messageEmbed, nickname, buff.content.options.ww.header),
							inline: false
						},
						ironFist: {
							name: buff.content.options.if.header,
							value: await helper.get(messageEmbed, buff.content.options.if.header),
							inline: false
						},
						patriot: {
							name: buff.content.options.pa.header,
							value: await helper.get(messageEmbed, buff.content.options.pa.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
				case 'buffIronFist':
					fieldValues = {
						chiefStrat: {
							name: buff.content.options.cs.header,
							value: await helper.get(messageEmbed, buff.content.options.cs.header),
							inline: false
						},
						mightyOx: {
							name: buff.content.options.mo.header,
							value: await helper.get(messageEmbed, buff.content.options.mo.header),
							inline: false
						},
						masterMedic: {
							name: buff.content.options.mm.header,
							value: await helper.get(messageEmbed, buff.content.options.mm.header),
							inline: false
						},
						warWolf: {
							name: buff.content.options.ww.header,
							value: await helper.get(messageEmbed, buff.content.options.ww.header),
							inline: false
						},
						ironFist: {
							name: buff.content.options.if.header,
							value: await helper.edit(messageEmbed, nickname, buff.content.options.if.header),
							inline: false
						},
						patriot: {
							name: buff.content.options.pa.header,
							value: await helper.get(messageEmbed, buff.content.options.pa.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
				case 'buffPatriot':
					fieldValues = {
						chiefStrat: {
							name: buff.content.options.cs.header,
							value: await helper.get(messageEmbed, buff.content.options.cs.header),
							inline: false
						},
						mightyOx: {
							name: buff.content.options.mo.header,
							value: await helper.get(messageEmbed, buff.content.options.mo.header),
							inline: false
						},
						masterMedic: {
							name: buff.content.options.mm.header,
							value: await helper.get(messageEmbed, buff.content.options.mm.header),
							inline: false
						},
						warWolf: {
							name: buff.content.options.ww.header,
							value: await helper.get(messageEmbed, buff.content.options.ww.header),
							inline: false
						},
						ironFist: {
							name: buff.content.options.if.header,
							value: await helper.get(messageEmbed, buff.content.options.if.header),
							inline: false
						},
						patriot: {
							name: buff.content.options.pa.header,
							value: await helper.edit(messageEmbed, nickname, buff.content.options.pa.header),
							inline: false
						}
					}
					await sendReply(interaction, messageEmbed, fieldValues)
					break
			}
		}
	}
}