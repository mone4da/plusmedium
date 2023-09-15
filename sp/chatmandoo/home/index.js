class Component{
    constructor(){
    }

    message(id){
        return document.getElementById(id).value
    }

    update(id, data){
        let e = document.getElementById(id)
        e.value = data
    }

    updateLabel(id, data){
        let e = document.getElementById(id)
        e.textContent = data
    }
    
}

class Sender extends Component{
    constructor(){
        super()

        let send = document.getElementById('send')
        send.onclick = () => {
               fetch('/send', {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json"
                    },
                     body: JSON.stringify({
                            message: this.message('out')
                     })
                }).catch(e => console.log(e) )
                
        }
    }
}

class Message extends Component{
    constructor() {
        super()
    }

    update(data){
        super.update('in', data.message)
        super.updateLabel('latency', 'latency : ' + data.latency)
    }
}

class Peers extends Component{
    constructor(){
        super()

        this.list = []
    }

    update(data){
        this.list.push(data.peer)
        this.render()
    }

    render(){
        let e = document.getElementById('peers')
        let items = this.list.map( item => `<li id=${item.id}>${item.name}</li>`)
        e.innerHTML = '<ul>' + items.reduce((l,e) => l + e, '') + '</ul>'
    }
}

class Header extends Component{
    constructor(){
        super()
    }
}

class Dispatcher extends Component{
    constructor(header, message, sender, room){
        super()

        this.header = header
        this.message = message
        this.sender = sender
        this.room = room

        this.start()
    }

    start(){
        let es = new EventSource('/event')
        es.onmessage = e => {
            let data = JSON.parse(e.data)
            switch(data.target){
                case 'peers' : this.peers.update(data.message); break;
            }
        }
    }
}


let onload = () => {
    new Dispatcher(
        new Header(),
        new Peers()
        /*new Message(),
        new Sender()*/
    )
}