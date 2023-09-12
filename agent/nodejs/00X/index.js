const config = require('./config')

class Prompt extends require('./processor'){
	constructor(){
		super(config)

		this.config = config
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
		this.hello(this.config.credentials.address, config.peers.feuler, 'hello there')
	}

	onHello(data){
		this.hello(this.config.credentials.address, data.from, config.greeting )
	}
}

new Prompt()
