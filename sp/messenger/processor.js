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
			case 'peer.add' : this.onAddPeer(data); break;
			case 'peer.rem' : this.onRemPeer(data); break;
			case 'peer.set' : this.onSetPeer(data); break;
			case 'peer.get' : this.onGetPeer(data); break;
			case 'peer.lst' : this.onLstPeer(data); break;

			case 'msg.add' : this.onAddMsg(data); break;
			case 'msg.rem' : this.onRemMsg(data); break;
			case 'msg.set' : this.onSetMsg(data); break;
			case 'msg.get' : this.onGetMsg(data); break;
			case 'msg.lst' : this.onLstMsg(data); break;
		}
	}

	onGranted(data){
		console.log('granted', data)
	}

	onDenied(data){
		console.log('denied', data)
	}

	onAddPeer(data){}
	onRemPeer(data){}
	onGetPeer(data){}
	onSetPeer(data){}
	onLstPeer(data){}

	onAddMsg(data){}
	onRemMsg(data){}
	onGetMsg(data){}
	onSetMsg(data){}
	onLstMsg(data){}

	AIAUCHETO(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'aiaucheto',
			detail ) )
	}

	messages(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'msg.lst',
			detail ) )
	}

	peers(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'peer.lst',
			detail ) )
	}

	peer(from, to, detail){
		this.send('data', msg.create(
			from,
			to,
			'peer.get',
			detail ) )
	}
}

module.exports = Processor
