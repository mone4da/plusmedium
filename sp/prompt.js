
class Prompt extends require('./processor'){
	constructor(config){
		super()

		this.config = config
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

module.exports = Prompt
