import { SlashCommandBuilder } from 'discord.js'
import { bot } from '../config.js'

export default {
	data: new SlashCommandBuilder()
		.setName(bot.prefix)
		.setDescription('main command for radr bot - creates a empty raid today')
		.addSubcommand(subcommand => subcommand
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
				.setRequired(true))
		)
		.addSubcommand(subcommand => subcommand
			.setName('cc')
			.setDescription('create a new CC')
			.addStringOption(option => option
				.setName('ccdate')
				.setDescription('Date of CC')
				.setRequired(true))
		)
		.addSubcommand(subcommand => subcommand
			.setName('svs')
			.setDescription('create a new SvS')
			.addStringOption(option => option
				.setName('svsdate')
				.setDescription('Date of SvS')
				.setRequired(true))
		)
		.addSubcommand(subcommand => subcommand
			.setName('buff')
			.setDescription('create a new buff')
			.addStringOption(option => option
				.setName('buffdate')
				.setDescription('Date of buff')
				.setRequired(true))
		)
		.addSubcommand(subcommand => subcommand
			.setName('help')
			.setDescription('help')
		),
		
		execute: async () => {}
}