const msg = require('../message')

class Processor extends require('../session'){
	constructor(){
		super()
	}

	onSignal(error, data){
		this.onCommand(error, data)
	}

	onData(error, data){
		this.onCommand(error, data)
	}

	onCommand(error, data){
		switch(data.subject){
			case 'chat' : this.onChat(data); break;
		}
	}

	onGranted(data){
		console.log('granted', data)
	}

	onDenied(data){
		console.log('denied', data)
	}

	onChat(data){}

	AIAUCHETO(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'aiaucheto',
			detail ) )
	}

	chat(from, to, detail){
		this.send('data', msg.create(
				from,
				to,
				'chat',
				detail ) )
}
}

module.exports = Processor
