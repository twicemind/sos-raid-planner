import { REST, Routes } from 'discord.js'
import { discord } from './config.deploy.js'
import fs from 'node:fs'
import path from 'node:path'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const commands = []
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const { default: command } = await import(commandsPath+`/${file}`)
	commands.push(command.data.toJSON())
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(discord.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`)
		console.log('guilds: ' + discord.guilds.length)
		for (var i = 0; i < discord.guilds.length; i++) {
			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(discord.client_id, discord.guilds[i].id),
				{ body: commands },
			)
			console.log(`Successfully reloaded ${data.length} application (/) commands for guild ${discord.guilds[i].name} with ID: ${discord.guilds[i].id}.`)
			console.log('commands: ')
			for (var j = 0; j < commands.length; j++) {
				if (commands[j].options.length == 0) {
					console.log(commands[j].name)
				} else {
					for (var k = 0; k < commands[j].options.length; k++) {
						console.log(commands[j].name + ' ' + commands[j].options[k].name)
					}
				}
			}
		}
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error)
	}
})()