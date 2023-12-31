const config = require('./config')
const Notifier = require('./notifier')

class Prompt extends require('./processor'){
	constructor(){
		super(config.prompt)

		this.config = config.prompt
		this.address = this.config.credentials.address
		this.greeting = this.config.greeting
		this.peers = this.config.peers

		this.connect(this.config.host)
	}

	onError(error){
		console.log('error --> ', error)
	}

	onOpen(){
		console.log('open ... signin')
		this.signin(this.config.credentials)
	}

	onGranted(data){
		console.log('granted', data)
	}

	onHello(data){
	 	notifier.notify(data.detail)
	}

	onChat(data){
		console.log('response', data)

		let message = JSON.stringify({message: data.detail, latency: Date.now() - data.timestamp})
		notifier.notify(message)
	}

	onAddPeer(data){
		notifier.notify({target: 'peers', ...data.detail})
	}

	sendMessage(message){
		this.chat(this.address, this.peers.feuler, message )
	}
}

class App extends require('./desk'){
	constructor(){
		super(config.app)
	}

	onListening(){
		console.log(config.app.greeting)
	}

	send(data){
		console.log('send', data)
		!notifier.notify(data) || prompt.sendMessage(data.message)
	}

	addSession(res){
		notifier.addSession(res)
	}

	onJoin(id, name){
		console.log('join', id, name)
		motifier.join(id, name)
	}

}


let notifier = new Notifier()
let prompt = new Prompt()
let app = new App()

