async function getFieldValue (fields, fieldName) {
	if (fields) {
		for (let i in fields) {
			if (fields[i].name === fieldName) {
				return fields[i].value
			}
		}
	}
	return '\u200B'
}

async function getMemberList (content) {
	let messageContent = content.split('\n')
	let memberList = []
	for (let i = 0; i < messageContent.length; i++) {
		if (messageContent[i] != '' && !new RegExp(/[\u200B-\u200D\uFEFF]/g).test(messageContent[i])) {
			memberList.push(messageContent[i])
		}
	}
	return memberList
}

async function add (list, nickname, extra) {
	if(extra) { nickname += extra }
	for (let i = 0; i < list.length; i++) {
		if (list[i] === nickname) {
			list.splice(i, 1)
			return list
		}
	}
	list.push(nickname)
	return list
}

async function createNicknameList (list) {
	let value = ''
	for (let i = 0; i < list.length; i++) {
		value += list[i] + '\n'
	}
	value += '\u200B'
	return value
}

export default {

	async remove (embed, nickname, fieldName) {
		let value = await getFieldValue(embed.fields, fieldName)
		let list = await getMemberList(value)
		for (let i = 0; i < list.length; i++) {
			if (list[i].startsWith(nickname)) {
				list.splice(i, 1)
			}
		}
		return createNicknameList(list)
	},

	async edit (embed, nickname, fieldName, extra) {
		if(extra) { nickname += extra }
		let value = await getFieldValue(embed.fields, fieldName)
		let list = await getMemberList(value)
		list = await add(list, nickname)
		return createNicknameList(list)
	},

	async getEmbet (embeds, title) {
		for (let i = 0; i < embeds.length; i++) {
			if (embeds[i].data.title === title) {
				return embeds[i].data
			}
		}
		return false
	}
}