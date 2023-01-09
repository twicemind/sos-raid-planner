import { Events } from 'discord.js'
import { Button, ActionRow } from '../lib/discord.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { EmbedContent } from '../embed/embed.content.js'
import { svs } from '../config.js'

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'SvS',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return    
		if (interaction.options.getSubcommand() === 'svs') {

			let date = interaction.options.getString('svsdate')

			const config = new Options().message()
			config.title = svs.content.header
			config.description = svs.content.description
			config.color = new Color().get(svs.content.color)
			config.thumbnail = 'attachment://ss.png'
			config.fields = new EmbedContent().svs(svs, date, '\u200B', '\u200B', '\u200B')

			const row = new ActionRow().create()
			const row2 = new ActionRow().create()

			for (let i = 0; i < svs.buttons.length; i++) {
				if (i < 3) {
					row.addComponents(new Button().create(svs.buttons[i].id, svs.buttons[i].label, svs.buttons[i].type))
				} else {
					row2.addComponents(new Button().create(svs.buttons[i].id, svs.buttons[i].label, svs.buttons[i].type))
				}
			}
			const embed = new Embed(config)
			await interaction.reply({ embeds: [embed], components: [row, row2], files: ['./src/resource/ss.png'], ephemeral: false })
		}
	}
}