const config = require('./config')
const Notifier = require('./notifier')

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
		this.AIAUCHETO(this.address, this.peers.system, Date.now())
	}

	onChat(data){
		let message = {id: 'message', to: data.detail.request.session,  data: data.detail.response}
        console.log('response', message)
        
		notifier.notify(message) 
	}

	reply(data){
        console.log(data)
		this.chat(this.address, this.peers.feuler, data)
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
		prompt.reply(data)
	}

	addSession(res){
		notifier.addSession(res)
	}
}


let notifier = new Notifier()
let prompt = new Prompt(config.prompt)
let app = new App()

