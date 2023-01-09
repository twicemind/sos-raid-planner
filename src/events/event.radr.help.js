import { Events } from 'discord.js'
import { Color, Embed, Options } from '../embed/embed.js'
import { EmbedContent } from '../embed/embed.content.js'
import { help } from '../config.js'

export default {
	name: Events.InteractionCreate,
	once: false,
	description: 'Raidar Help',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return    
		if (interaction.options.getSubcommand() === 'help') {
			const config = new Options().message()
			config.title = help.content.header
			config.description = help.content.description
			config.color = new Color().get(help.content.color)
			//config.thumbnail = 'attachment://help.png'
			config.fields = new EmbedContent().help(help)
			const embed = new Embed(config)
			//await interaction.reply({ embeds: [embed], files: ['./src/resource/buff.png'], ephemeral: true })
			await interaction.reply({ embeds: [embed], ephemeral: true })
		}
	}
}