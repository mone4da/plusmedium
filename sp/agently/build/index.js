let user = {id: ''}

let es = new EventSource('/event')
let outbox = document.getElementById('outbox')
let inbox = document.getElementById('inbox')
let send = document.getElementById('send')

//actions
let init = data => {
    user.id = data.id 
}

let update = data => {
    inbox.value += '\n' + outbox.value + '\n' + data
    outbox.value = ''
}

//events
send.onclick = () => {
    if (outbox.value.trim() === '')
        return

    fetch('/send', {
         method: 'POST',
         headers: {
             "Content-Type" : "application/json"
         },
          body: JSON.stringify({
                session: user.id,
                message: outbox.value
          })
     }).catch(e => console.log(e) )

}
es.onmessage = event => {
    let {id, data} = JSON.parse(event.data)
    switch(id){
        case 'session' : init(data);  break;
        case 'message' : update(data); break;
    }
}

