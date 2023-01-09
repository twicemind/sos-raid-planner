import { Events } from 'discord.js'
import fs from 'node:fs'
import { discord } from '../config.deploy.js'

async function getCommands () {
  const commands = []
  const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

  for (const file of commandFiles) {
    const { default: command } = await import('../commands'+`/${file}`)
    commands.push(command.data.toJSON())
  }
  return commands
}

function updateGuildConfig(guild) {
  discord.guilds.push({id: guild.id, name: guild.name})
  fs.writeFileSync('./src/config.deploy.js', 'export const discord = ' + JSON.stringify(discord))
}


export default {
	name: Events.GuildCreate,
	once: false,
	description: 'new Guild created',
	async execute(guild) {
    let commands = await getCommands()
    guild.commands.set(commands).then(() => 
    console.log(`Commands deployed in guild ${guild.name}!`))
    updateGuildConfig(guild)
	}
}