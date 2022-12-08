const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder } = require('discord.js');

async function getParticipants (content) {
  let messageContent = content.split('\n')
  let participantsID = messageContent.indexOf('__PARTICIPANTS:__')
  let reservesID = messageContent.indexOf('__RESERVES:__')
  let participants = []

  for (let i = participantsID + 1; i < reservesID; i++) {
    if(messageContent[i] !== '') {
      participants.push(messageContent[i])
    }
  }
  return participants
}

async function getReserves (content) {
  let messageContent = content.split('\n')
  let reservesID = messageContent.indexOf('__RESERVES:__')
  let reserves = []
  for (let i = reservesID + 1; i < messageContent.length; i++) {
    if(messageContent[i] !== '') {
      reserves.push(messageContent[i])
    }
  }
  return reserves
}

async function addParticipant(participants, nickname) 
{
  for (let i = 0; i < participants.length; i++) {
    if (participants[i] === nickname) {
      participants.splice(i, 1)
      return participants
    }
  }
  participants.push(nickname)
  return participants
}

async function addReserve(reserves, nickname) 
{
  for (let i = 0; i < reserves.length; i++) {
    if (reserves[i] === nickname) {
      reserves.splice(i, 1)
      return reserves
    }
  }
  reserves.push(nickname)
  return reserves
}

async function deleteParticipant(content, nickname) 
{
  let participants = await getParticipants(content)
  for (let i = 0; i < participants.length; i++) {
    if (participants[i] === nickname) {
      participants.splice(i, 1)
    }
  }
  return createNicknameList(participants)
}

async function deleteReserves(content, nickname) 
{
  let reserves = await getReserves(content)
  for (let i = 0; i < reserves.length; i++) {
    if (reserves[i] === nickname) {
      reserves.splice(i, 1)
    }
  }
  return createNicknameList(reserves)
}

async function editParticipants (content, nickname) {
  let participants = await getParticipants(content)
  participants = await addParticipant(participants, nickname)
  return createNicknameList(participants)
}

async function editReserves (content, nickname) {
  let reserves = await getReserves(content)
  reserves = await addReserve(reserves, nickname)
  return createNicknameList(reserves)
}

async function createNicknameList (nicknames) {
  let nicknameList = ''
  for (let i = 0; i < nicknames.length; i++) {
    nicknameList += nicknames[i] + '\n'
  }
  return nicknameList
}

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    let nickname = 'not set'
    if (interaction.member.nickname !== null && interaction.member.nickname !== undefined){
      nickname = interaction.member.nickname
    } else {
      nickname = interaction.member.user.username
    }
    if (interaction.customId === 'participate') {
      participantsString = await editParticipants(interaction.message.content, nickname)
      reservesString = await deleteReserves(interaction.message.content, nickname)
    } else if (interaction.customId === 'reserve') {
      reservesString = await editReserves(interaction.message.content, nickname)
      participantsString = await deleteParticipant(interaction.message.content, nickname)
    } else if (interaction.customId === 'userParticipate') {
      const modal = new ModalBuilder()
			  .setCustomId('AddUserModalParticipate')
			  .setTitle('Add a User to participants');

      const memberSelectionInput = new TextInputBuilder()
        .setCustomId('memberSelectionParticipate')
        .setLabel('Write member to add to participants')
        .setStyle(TextInputStyle.Short);
      
      const memberSelectionRow = new ActionRowBuilder().addComponents(memberSelectionInput);
		  modal.addComponents(memberSelectionRow);
		  await interaction.showModal(modal)
    
    } else if (interaction.customId === 'userReserve') {
      const modal = new ModalBuilder()
			  .setCustomId('AddUserModalReserve')
			  .setTitle('Add a User to reserve');

      const memberSelectionInput = new TextInputBuilder()
        .setCustomId('memberSelectionReserve')
        .setLabel('Write member to add to reserve')
        .setStyle(TextInputStyle.Short);
      
      const memberSelectionRow = new ActionRowBuilder().addComponents(memberSelectionInput);
		  modal.addComponents(memberSelectionRow);
		  await interaction.showModal(modal)
    } else if (interaction.customId === 'AddUserModalParticipate') {
      let user2Add = interaction.fields.getTextInputValue('memberSelectionParticipate');
      if (user2Add !== '') {
        participantsString = await editParticipants(interaction.message.content, user2Add)
        reservesString = await deleteReserves(interaction.message.content, user2Add)
      }
    } else if (interaction.customId === 'AddUserModalReserve') {
      let user2Add = interaction.fields.getTextInputValue('memberSelectionReserve');
      if (user2Add !== '') {
        reservesString = await editReserves(interaction.message.content, user2Add)
        participantsString = await deleteParticipant(interaction.message.content, user2Add)
      }
    }

    if (interaction.customId === 'participate' || interaction.customId === 'reserve' || interaction.customId === 'AddUserModalParticipate' || interaction.customId === 'AddUserModalReserve') {
      let messageContent = interaction.message.content.split('\n')
      let participantsID = messageContent.indexOf('__PARTICIPANTS:__')
      let content = ''
      for (let i = 0; i < participantsID; i++) {
        content += messageContent[i] + '\n'
      }

      content += '__PARTICIPANTS:__'
        + '\n'
        + participantsString
        + '\n'
        + '__RESERVES:__'
        + '\n'
        + reservesString

      await interaction.message.edit(content)
      await interaction.reply({ content: 'You have joined the raid!\n\n This message will be automatically deleted after 10 seconds', ephemeral: true });
      setTimeout(() => interaction.deleteReply(), 10000);
    }
  }
};