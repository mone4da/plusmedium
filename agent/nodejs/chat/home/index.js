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
                this.update('out', Date.now())
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

class Receiver extends Component{
    constructor(){
        super()

        let es = new EventSource('/event')
        es.onmessage = e => {
            let data = JSON.parse(e.data)
            this.update('in', data.message)
            //this.updateLabel('latency', 'latency : ' + data.latency)
        }
    }
}

let onload = () => {
    new Sender()
    new Receiver()
}