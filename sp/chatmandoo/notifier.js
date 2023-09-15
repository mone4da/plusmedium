const uuid = require('uuid')

class Session{
	constructor(res, close){
        console.log('session ...')
		this.res = res
		this.res.set({
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-cache',
				'Content-Type': 'text/event-stream',
				'Connection': 'keep-alive'
			})

		res.flushHeaders()

		this.res.socket.on('close', () => {
				close && close()
		})
	}

	notify(data){
		this.res.write(`data: ${data}\n\n`)
	}
}

class Notifier{
	constructor(){
		this.sessions = {}
	}

	addSession(res){
		let  id = uuid.v4()
		this.sessions[id] = new Session(res,id, () => {
			delete this.sessions[id]
		}) 
	}

	notify(data){
		let peer = this.sessions[data.to]
		peer?.notify(data)

		return peer !== undefined
	}
}

module.exports = Notifier