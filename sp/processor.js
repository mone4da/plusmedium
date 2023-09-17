const msg = require('../message')

class Processor extends require('../session'){
	constructor(){
		super()
	}

	onSignal(error, data){
		this.onCommand(data)
	}

	onData(error, data){
		this.onCommand(data)
	}

	onCommand(data){
		switch(data.subject){
			case 'hello' : this.onHello(data); break;
			case 'chat' : this.onChat(data); break;
			case 'peer.add' : this.onAddPeer(data); break;
		}
	}

	onGranted(data){
		console.log('granted', data)
	}

	onDenied(data){
		console.log('denied', data)
	}


	onHello(data){}
	onChat(data){}
	onAddPeer(data){}

	hello(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'hello',
			detail ) )
	}

	chat(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'chat',
			detail ) )
	}

	chatmandoo(from, to, id, name){
		this.send('data', msg.create(
			from,
			to,
			'peer.add',
			{id, name} ) )
	}
}

module.exports = Processor
