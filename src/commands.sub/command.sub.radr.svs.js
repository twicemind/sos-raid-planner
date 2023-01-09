export default {
	create: async (subcommand) => {
		subcommand
			.setName('svs')
			.setDescription('create a new SvS')
			.addStringOption(option => option
				.setName('svsdate')
				.setDescription('Date of SvS')
				.setRequired(true))
			
		return subcommand
	},
	execute: async () => {}
}