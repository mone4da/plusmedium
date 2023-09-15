const msg = require('../message')

class Processor extends require('../session'){
	constructor(){
		super()
	}

	onSignal(error, data){
		switch(data.subject){
			case 'echo' : this.onHello(data); break;
			case 'chat' : this.onChat(data); break;
		}
	}

	onData(error, data){
		switch(data.subject){
			case 'hello' : this.onHello(data); break;
			case 'chat' : this.onChat(data); break;
		}
	}

	onGranted(data){
		console.log('granted', data)
	}

	onDenied(data){
		console.log('denied', data)
	}


	onHello(data){}

	hello(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'hello',
			detail ) )
	}

	onChat(data){}

	chat(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'chat',
			detail ) )
	}

}

module.exports = Processor
