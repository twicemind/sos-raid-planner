const { SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

function createContent(raidDate, timeOption1, timeOption2, timeOption3) {
	let content = '' +
	'__RESERVOIR RAID: ' + raidDate + '__'
	+ '\n'
	+ '1st: ' + timeOption1 + ' UTC'
	+ '\n'
	+ '2nd: ' + timeOption2 + ' UTC'
	+ '\n'
	+ '3rd: ' + timeOption3 + ' UTC'
	+ '\n'
	+ '\n'
	+ 'React to this message to participate or reserve a spot.'
	+ '\n'
  + '\n'
	+ '(Register for Participants only if you\'ll do your best to attend all the three options)'
  + '\n'
  + '__PARTICIPANTS:__'
	+ '\n'
	+ '\n'
	+ '__RESERVES:__'
	+ '\n'
	+ '\n'

	return content
}

async function sendInteraction (interaction, content, components) {
  await interaction.reply({ content: content, components: components });
}
module.exports = function () {
	let obj = {}

	obj.data = new SlashCommandBuilder()
    .setName('radr')
    .setDescription('main command for radr bot - creates a empty raid today')
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('create a new raid')
        .addStringOption(option => 
          option
          .setName('title')
          .setDescription('Date of raid')
          .setRequired(true))
        .addIntegerOption(option => 
          option
          .setName('time1')
          .setDescription('Time slot 1 (UTC) of raid')
          .setRequired(true))
        .addIntegerOption(option => 
          option
          .setName('time2')
          .setDescription('Time slot 2 (UTC) of raid')
          .setRequired(true))
        .addIntegerOption(option => 
          option
          .setName('time3')
          .setDescription('Time slot 3 (UTC) of raid')
          .setRequired(true))
    )
	
	obj.execute = async (interaction) => {
    let raidDate = '' 
    let timeOption1 = 12
    let timeOption2 = 14
    let timeOption3 = 20

    if (interaction.options.getSubcommand() === 'create') {
      raidDate = interaction.options.getString('title')
      timeOption1 = interaction.options.getInteger('time1')
      timeOption2 = interaction.options.getInteger('time2')
      timeOption3 = interaction.options.getInteger('time3')
    }

    const content = createContent(raidDate, timeOption1, timeOption2, timeOption3)

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('participate')
					.setLabel('Participant')
					.setStyle(ButtonStyle.Success),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('reserve')
					.setLabel('Reserve')
					.setStyle(ButtonStyle.Primary),
			)
      .addComponents(
				new ButtonBuilder()
					.setCustomId('userParticipate')
					.setLabel('Add User to Participant')
					.setStyle(ButtonStyle.Secondary),
			)
      .addComponents(
				new ButtonBuilder()
					.setCustomId('userReserve')
					.setLabel('Add User to Reserve')
					.setStyle(ButtonStyle.Secondary),
			)

    await sendInteraction(interaction, content, [row]);
	}

	return obj
}