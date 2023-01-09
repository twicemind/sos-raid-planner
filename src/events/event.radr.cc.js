import { Events } from 'discord.js'
import { Button, ActionRow } from '../lib/discord.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { cc } from '../config.js'
import { EmbedContent } from '../embed/embed.content.js'


export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Capital Clash',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return    
		if (interaction.options.getSubcommand() === 'cc') {

			let date = interaction.options.getString('ccdate')

			const config = new Options().message()
			config.title = cc.content.header
			config.description = cc.content.description
			config.color = new Color().get(cc.content.color)
			config.thumbnail = 'attachment://cc.png'
			config.fields = new EmbedContent().capital(cc, date, '\u200B', '\u200B', '\u200B')

			const row = new ActionRow().create()
			const row2 = new ActionRow().create()

			for (let i = 0; i < cc.buttons.length; i++) {
				if (i < 3) {
					row.addComponents(new Button().create(cc.buttons[i].id, cc.buttons[i].label, cc.buttons[i].type))
				} else {
					row2.addComponents(new Button().create(cc.buttons[i].id, cc.buttons[i].label, cc.buttons[i].type))
				}
			}
			const embed = new Embed(config)
			await interaction.reply({ embeds: [embed], components: [row,row2], files: ['./src/resource/cc.png'], ephemeral: false })
		}
	}
}