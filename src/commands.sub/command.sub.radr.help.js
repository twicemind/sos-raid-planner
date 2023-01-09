export default {
	create: (subcommand) => {
		subcommand
			.setName('help')
			.setDescription('shows help for the bot')

		return subcommand
	},

	execute: async () => {}
}