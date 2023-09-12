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
	}

	onHello(data){
		this.echo(this.address, data.from, config.greeting )
	}
}

new Prompt()
