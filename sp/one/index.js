const {One} = require('./one')

let one = new One('./data/',20, 500)

let populate = () => {
	one.init()
	one.load()

	for(let i = 0; i<1000; i++){
		let key = 4000 + i
		let data = {
			name: 'item ' + key,
			description: 'this is the item ' + key

		}
		one.add(key, data)
	}
	one.save()
}


//populate()

one.load()
one.collect((sid, item) => console.log(sid, item))

//one.collect((sid, item) => console.log(sid, item))

/*console.log(one.get(4983))

one.set(4983, {name: 'new name', description: 'new description'})

console.log(one.get(4983))*/



