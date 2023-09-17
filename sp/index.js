const config = require('./config')
const Notifier = require('./notifier')
const Prompt = require('./prompt')

class App extends require('./desk'){
	constructor(config){
		super(config)
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
let prompt = new Prompt(config.prompt)
let app = new App(config.app)
