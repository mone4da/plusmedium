
class Messages{
	constructor(config){
		this.items = []
	}

	add(from, to, time, data){
		this.items.push({
			time,
			from,
			to,
			data
		})
	}

	list(from, to){
		return this.items.filter(item => item.from === from && item.to === to)
	}

	listAt(time, from, to){
		return this.items.filter(item => item.from === from && item.to === to && item.time === time)
	}

}

module.exports = Messages
