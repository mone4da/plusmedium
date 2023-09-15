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
		this.sessions = []
	}

	addSession(res){
		this.sessions = []
		this.sessions.push( new Session(res, () => this.sessions = []) )
	}

	notify(data){
		for(let s of this.sessions)
			s.notify(data)
	}
}

module.exports = Notifier