const uuid = require('uuid')

class Session{
	constructor(res, id, close){
        console.log('session ...', id)

		this.id = id
		this.res = res
		this.res.set({
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-cache',
				'Content-Type': 'text/event-stream',
				'Connection': 'keep-alive'
			})

		res.flushHeaders()

		this.welcome()

		this.res.socket.on('close', () => {
				close && close()
		})
	}

	welcome(){
		let data = JSON.stringify({target: 'user', message:{ id: this.id, name: ''}})
		this.res.write(`data: ${data}\n\n`)
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

			this.broadcast(id, {event: 'peers-', message: {id}})
		}) 

		return id
	}

	notify(data){
		let peer = this.sessions[data.to]
		peer?.notify(data)

		return peer !== undefined
	}

	broadcast(from, message){
		let peers = Object.values(this.sessions).filter(s => s.id != from)
		for(let peer of peers)
			peer.notify(message)
	}

	join(id, name){
		let session = this.sessions[id]
		session?.name = name
		session?.joined = true

		this.broadcast(id, {event: 'peers+', message: {id, name}})
	}
}

module.exports = Notifier