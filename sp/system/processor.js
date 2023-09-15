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
		console.log('command', data)
		switch(data.subject){
			case 'aiaucheto' : this.onAIAUCHETO(data); break;
		}
	}

	onGranted(data){
		console.log('granted', data)
	}

	onDenied(data){
		console.log('denied', data)
	}

	onAIAUCHETO(data){}

	AIAUCHETO(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'aiaucheto',
			detail ) )
	}

}

module.exports = Processor
