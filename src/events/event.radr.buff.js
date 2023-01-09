import { Events } from 'discord.js'
import { Button, ActionRow } from '../lib/discord.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { EmbedContent } from '../embed/embed.content.js'
import { buff } from '../config.js'

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Raid Buff',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return    
		if (interaction.options.getSubcommand() === 'buff') {
			let date = interaction.options.getString('buffdate')

			const config = new Options().message()
			config.title = buff.content.header
			config.description = buff.content.description
			config.color = new Color().get(buff.content.color)
			config.thumbnail = 'attachment://buff.png'
			config.fields = new EmbedContent().buff(buff, date, '\u200B', '\u200B', '\u200B','\u200B', '\u200B', '\u200B')

			const row = new ActionRow().create()
			const row2 = new ActionRow().create()

			for (let i = 0; i < buff.buttons.length; i++) {
				if (i < 3) {
					row.addComponents(new Button().create(buff.buttons[i].id, buff.buttons[i].label, buff.buttons[i].type))
				} else {
					row2.addComponents(new Button().create(buff.buttons[i].id, buff.buttons[i].label, buff.buttons[i].type))
				}
			}
			const embed = new Embed(config)
			await interaction.reply({ embeds: [embed], components: [row,row2], files: ['./src/resource/buff.png'], ephemeral: false })
		}
	}
}