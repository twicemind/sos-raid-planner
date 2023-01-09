import { Events } from 'discord.js'

export default {
	name: Events.ClientReady,
	once: true,
	description: 'Client is ready',
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`)
	}
}