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
                })
        }
    }
}

class Receiver extends Component{
    constructor(){
        super()
        
        let es = new EventSource('/event')
        es.onmessage = e => {
            this.update('in', e.data)
        }
    }
}

let onload = () => {
    new Sender()
    new Receiver()
}