import helper from '../lib/radr.svs.helper.js'
import { Modal, TextInput, ActionRow, Nickname } from '../lib/discord.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { Events } from 'discord.js'
import { svs } from '../config.js'

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'SvS registration',
	async execute(interaction) {

		if (interaction.customId === 'svsyes') {
			const modal = new Modal().create('AddSVSYes', 'Add your HQ')
			const txt = new TextInput().create('modalTxTSVSHqLevelYes', 'Your HQ Level', 'short')
			const row = new ActionRow().create().addComponents(txt)

			modal.addComponents(row)
			await interaction.showModal(modal)
		} else if (interaction.customId === 'svsyesbut') {
			const modal = new Modal().create('AddSVSYesBut', 'Add your HQ and Time')
			const addSVSTimeFromYesButTxT = new TextInput().create('modalTxTSVSTimeFromYesBut', 'Time from (UTC)', 'short')
			const addSVSTimeTolYesButTxT = new TextInput().create('modalTxTSVSTimeToYesBut', 'Time to (UTC)', 'short')
			const addSVSHqLevelYesButTxT = new TextInput().create('modalTxTSVSHqLevelYesBut', 'Your HQ-Level', 'short')

			const addSVSTimeFromYesButRow = new ActionRow().create().addComponents(addSVSTimeFromYesButTxT)
			const addSVSTimeToYesButRow = new ActionRow().create().addComponents(addSVSTimeTolYesButTxT)
			const addSVSHqLevelYesButRow = new ActionRow().create().addComponents(addSVSHqLevelYesButTxT)

			modal.addComponents(addSVSHqLevelYesButRow)
			modal.addComponents(addSVSTimeFromYesButRow)
			modal.addComponents(addSVSTimeToYesButRow)

			await interaction.showModal(modal)
		} if (interaction.customId === 'usersvsyes') {
			const modal = new Modal().create('AddSVSYesUserAdd', 'Add your HQ')
			const txt = new TextInput().create('modalTxTSVSUserAddYes', 'Username', 'short')
			const txt2 = new TextInput().create('modalTxTSVSHqLevelYesUser', 'Your HQ Level', 'short')
			const row = new ActionRow().create().addComponents(txt)
			const row2 = new ActionRow().create().addComponents(txt2)
			modal.addComponents(row, row2)
			await interaction.showModal(modal)
		} else if (interaction.customId === 'usersvsyesbut') {
			const modal = new Modal().create('AddSVSYesButUserAdd', 'Add your HQ and Time')
			const txt = new TextInput().create('modalTxTSVSUserAddYesBut', 'Username', 'short')
			const addSVSTimeFromYesButTxT = new TextInput().create('modalTxTSVSTimeFromYesButUser', 'Time from (UTC)', 'short')
			const addSVSTimeTolYesButTxT = new TextInput().create('modalTxTSVSTimeToYesButUser', 'Time to (UTC)', 'short')
			const addSVSHqLevelYesButTxT = new TextInput().create('modalTxTSVSHqLevelYesButUser', 'Your HQ-Level', 'short')

			const row = new ActionRow().create().addComponents(txt)
			const addSVSTimeFromYesButRow = new ActionRow().create().addComponents(addSVSTimeFromYesButTxT)
			const addSVSTimeToYesButRow = new ActionRow().create().addComponents(addSVSTimeTolYesButTxT)
			const addSVSHqLevelYesButRow = new ActionRow().create().addComponents(addSVSHqLevelYesButTxT)

			modal.addComponents(row, addSVSHqLevelYesButRow, addSVSTimeFromYesButRow, addSVSTimeToYesButRow)

			await interaction.showModal(modal)
		} else if (interaction.customId === 'usersvsnope') {
			const modal = new Modal().create('AddSVSNopeUserAdd', 'Add a User to Nope')
			const txt = new TextInput().create('modalTxTSVSUserAddNope', 'Username', 'short')
			const row = new ActionRow().create().addComponents(txt)

			modal.addComponents(row)

			await interaction.showModal(modal)
		} else if (interaction.customId === 'svsnope') {
			let nickname = await new Nickname().get(interaction)
			let messageEmbed = await helper.getEmbet(interaction.message.embeds, svs.content.header)

			const config = new Options().message()
			config.title = svs.content.header
			config.description = svs.content.description
			config.color = new Color().get(svs.content.color)
			config.thumbnail = 'attachment://ss.png'

			let fields = []
			for (let i = 0; i < messageEmbed.fields.length; i++) {
				if (!messageEmbed.fields[i].name.trim().includes(svs.content.yes.header.trim()) && 
						!messageEmbed.fields[i].name.trim().includes(svs.content.yesbut.header.trim()) && 
						!messageEmbed.fields[i].name.trim().includes(svs.content.nope.header.trim())) {
					fields.push(messageEmbed.fields[i])
				}
			}

			fields.push({ 
				name: svs.content.yes.header, 
				value: await helper.remove(messageEmbed, nickname, svs.content.yes.header), 
				inline: false })
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

			config.fields = fields

			const embed = new Embed(config)

			await interaction.message.edit({ embeds: [embed] })
			await interaction.reply({ content: 'You have joined the svs!\n\n This message will be automatically deleted after 10 seconds', ephemeral: true })
			setTimeout(() => interaction.deleteReply(), 10000)
		}
	}
}