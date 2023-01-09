import { Button, ActionRow } from '../lib/discord.helper.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { raid } from '../config.js'
import { Events } from 'discord.js'
import { EmbedContent } from '../embed/embed.content.js'

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Raid',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return    
		if (interaction.options.getSubcommand() === 'rr') {
			let date = interaction.options.getString('date')
			let timeOption1 = interaction.options.getInteger('time1')
			let timeOption2 = interaction.options.getInteger('time2')
			let timeOption3 = interaction.options.getInteger('time3')

			const config = new Options().message()
			config.title = raid.content.header
			config.description = raid.content.description
			config.thumbnail = 'attachment://rr.png'
			config.color = new Color().get(raid.content.color)

			config.fields = new EmbedContent().raid(raid, date, timeOption1, timeOption2, timeOption3, '\u200B', '\u200B')

			const row = new ActionRow().create()
			for (let i = 0; i < raid.buttons.length; i++) {
				row.addComponents(new Button().create(raid.buttons[i].id, raid.buttons[i].label, raid.buttons[i].type))
			}
			const embed = new Embed(config)
			await interaction.reply({ embeds: [embed], components: [row], files: ['./src/resource/rr.png'], ephemeral: false })
		}
	}
}