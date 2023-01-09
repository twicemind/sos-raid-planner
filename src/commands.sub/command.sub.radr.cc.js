export default {
	create: (subcommand) => { 
		subcommand
			.setName('cc')
			.setDescription('create a new CC')
			.addStringOption(option => option
				.setName('ccdate')
				.setDescription('Date of CC')
				.setRequired(true))

		return subcommand
	},

	execute: async () => {}
}