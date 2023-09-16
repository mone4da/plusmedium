
class Peers{
	constructor(config){
		this.items = {}
	}

	add(id, data){
		this.items[id] = data
	}

	list(){
		return this.items
	}
}

module.exports = Peers
