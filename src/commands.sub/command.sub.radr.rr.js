import { SlashCommandSubcommandBuilder } from 'discord.js'

export default {
	data: new SlashCommandSubcommandBuilder()
		.setName('rr')
		.setDescription('create a new raid')
		.addStringOption(option => option
			.setName('date')
			.setDescription('Date of raid')
			.setRequired(true))
		.addIntegerOption(option => option
			.setName('time1')
			.setDescription('Time slot 1 (UTC) of raid')
			.setRequired(true))
		.addIntegerOption(option => option
			.setName('time2')
			.setDescription('Time slot 2 (UTC) of raid')
			.setRequired(true))
		.addIntegerOption(option => option
			.setName('time3')
			.setDescription('Time slot 3 (UTC) of raid')
			.setRequired(true)),

	execute: async () => {}
}