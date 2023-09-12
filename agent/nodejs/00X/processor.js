const msg = require('../message')

class Processor extends require('../session'){
	constructor(){
		super()
	}

	onSignal(error, data){
		switch(data.subject){
			case 'echo' : this.onHello(data); break;
		}
	}

	onData(error, data){
		switch(data.subject){
			case 'hello' : this.onHello(data); break;

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
}

module.exports = Processor
