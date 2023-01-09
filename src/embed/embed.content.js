export class EmbedContent {
  raid(config, date, timeOption1, timeOption2, timeOption3, participants, reserves) {
    return [
			new Field('Date', date, false),
			new Field(config.content.options.row1, timeOption1 + ' ' + config.content.options.timezone, true),
			new Field(config.content.options.row2, timeOption2 + ' ' + config.content.options.timezone, true),
			new Field(config.content.options.row3, timeOption3 + ' ' + config.content.options.timezone, true),
			new Field('\u200B', '\u200B', false),
			new Field('Note to participants', config.content.participant.description, false),
			new Field(config.content.participant.header, participants, false),
			new Field(config.content.reserve.header, reserves, false)
		]
  }
	svs(config, date, yesMember, yesButMember, noMember) {
		return [
			new Field('Date', date, false),
			new Field(config.content.options.header1, config.content.options.description1, false),
			new Field(config.content.options.header2, config.content.options.description2, false),
			new Field(config.content.options.header3, config.content.options.description3, false),
			new Field('\u200B', '\u200B', false),
			new Field(config.content.yes.header, yesMember, false),
			new Field(config.content.yesbut.header, yesButMember, false),
			new Field(config.content.nope.header, noMember, false),
		]
	}
	capital(config, date, yesMember, yesButMember, noMember) {
		return [
			new Field('Date', date, false),
			new Field(config.content.options.header1, config.content.options.description1, false),
			new Field(config.content.options.header2, config.content.options.description2, false),
			new Field('\u200B', '\u200B', false),
			new Field(config.content.yes.header, yesMember, false),
			new Field(config.content.yesbut.header, yesButMember, false),
			new Field(config.content.nope.header, noMember, false),
		]
	}
	buff(config, date, csMember, moMember, mmMember, wwMember, ifMember, paMember) {
		return [
			new Field('Date', date, false),
			new Field(config.content.options.cs.description.header, config.content.options.cs.description.value, false),
			new Field(config.content.options.mo.description.header, config.content.options.mo.description.value, false),
			new Field(config.content.options.mm.description.header, config.content.options.mm.description.value, false),
			new Field(config.content.options.ww.description.header, config.content.options.ww.description.value, false),
			new Field(config.content.options.if.description.header, config.content.options.if.description.value, false),
			new Field(config.content.options.pa.description.header, config.content.options.pa.description.value, false),
			new Field('\u200B', '\u200B', false),
			new Field(config.content.options.cs.header, csMember, false),
			new Field(config.content.options.mo.header, moMember, false),
			new Field(config.content.options.mm.header, mmMember, false),
			new Field(config.content.options.ww.header, wwMember, false),
			new Field(config.content.options.if.header, ifMember, false),
			new Field(config.content.options.pa.header, paMember, false),
		]
	}
	help() {
		return [
			new Field('Commands', '\u200B', false),
			new Field('**/radr help**', 'shows this help', false),
			new Field('---------------', '\u200B', false),
			new Field('**/radr rr**', 'creates a new raid', false),
			new Field('*date*', 'title / date of raid', true),
			new Field('*time1*', 'timeoption1 of raid', true),
			new Field('*time2*', 'timeoption2 of raid', true),
			new Field('*time3*', 'timeoption3 of raid', true),
			new Field('---------------', '\u200B', false),
			new Field('**/radr cc**', 'creates a new Capital Clash Poll', false),
			new Field('*ccdate*', 'title / date of cc', true),
			new Field('---------------', '\u200B', false),
			new Field('**/radr svs**', 'creates a new State vs. State Poll', false),
			new Field('*svsdate*', 'title / date of svs', true),
			new Field('---------------', '\u200B', false),
			new Field('**/radr buff**', 'creates a new Gov Buff Poll', false),
			new Field('*buffdate*', 'title / date of buffs', true),
		]
	}
}

export class Field {
	constructor (title, value, inline) {
		return { name: title, value: value, inline: inline}
	}
}