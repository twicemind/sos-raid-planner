import { Events } from 'discord.js'
import fs from 'node:fs'
import { discord } from '../config.deploy.js'

function deleteGuild(guild) {
  for (var i = 0; i < discord.guilds.length; i++) {
    if (discord.guilds[i].id == guild.id) {
      discord.guilds.splice(i, 1)
    }
  }
  fs.writeFileSync('./src/config.deploy.js', 'export const discord = ' + JSON.stringify(discord))
}

export default {
	name: Events.GuildDelete,
	once: false,
	description: 'Guild deleted',
	async execute(guild) {
    deleteGuild(guild)
	}
}