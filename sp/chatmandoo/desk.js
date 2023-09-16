const xpr = require('express')

class Desk{
	constructor(config){
		let app = xpr();
		app.use(xpr.static(config.home))
		app.use(xpr.json())

		app.post('/send', (req, res) => {
			this.send(req.body) 
			res.end()
		})
		app.post('/join', (req, res) => {
			this.onJoin(req.body.id, req.body.name)
			res.end()
		})
		app.get('/event', (req, res) => this.addSession(res))

		app.listen(config.port, () => this.onListening())
	}

	addSession(res){}

	onListening(){}
	onJoin(id, name){}
	send(data){}
}

module.exports = Desk
