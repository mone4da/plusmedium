
const {Manager} = require('socket.io-client')
const msg = require('./message')

class Session{
	constructor(){
	}

	connect(host){
		let manager = new Manager(host)
		this.socket = manager.socket('/')
		this.socket.io.on('error', error => this.onError(error))
		this.socket.on('connect', () => this.onOpen())
		this.socket.on('granted', data => this.onGranted(data))
		this.socket.on('denied', data => this.onDenied(data))
		this.socket.on('data', data => this.onData(this.valid(data), data))
		this.socket.on('signal', data => this.onSignal(this.valid(data), data))
	}

	valid(data){
		return msg.valid(data)
	}

	onGranted(data){}
	onDenied(data){}
	onData(ok, data){}
	onSignal(ok, data){}

	onError(error){}
	onOpen(){}

	send(id, data){
		this.socket.emit(id, data)
	}

	signin(data){
		this.send('signin', data)
	}
}

module.exports = Session
