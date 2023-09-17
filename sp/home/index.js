let user = {id: '', name: ''}

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

    add(data){
        this.list.push(data)
        this.render()
    }

    remove(data){
        this.list = this.list.filter(item => item.id != data.id)
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

        let join = document.getElementById('join')
        join.onclick = () => {
            fetch('/join', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                 body: JSON.stringify({
                        id: user.id,
                        name: user.name
                 })
            }).catch(e => console.log(e) )
        }

        let name = document.getElementById('name')
        name.onchange = e => {
            user.name = e.target.value

            console.log(user)
        }

    }

    update(data){
        let {id, name} = data
        user.id = id 
        user.name = name
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
            console.log(data)
            switch(data.event){
                case 'peers+' : this.peers.add(data.message); break;
                case 'peers-' : this.peers.remove(data.message); break;
                case 'user' : this.header.update(data.message)
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