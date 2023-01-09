export default {
	create: (subcommand) => {
		subcommand
			.setName('buff')
			.setDescription('create a new Buff poll')
			.addStringOption(option => option
				.setName('buffdate')
				.setDescription('Date of Buff')
				.setRequired(true))
				
		return subcommand
	},
	
	execute: async () => {}
}