
const fs = require('fs')

class Segment{
	constructor(id, path, capacity){
		this.id = id
		this.capacity || 10
		this.path = path
	}

	init(){
		fs.writeFileSync(this.path,'[]','utf8')
	}

	load(){
		let content = fs.readFileSync(this.path, 'utf-8')
		this.items = JSON.parse(content)
	}

	save(){
		this.saveAs(this.path)
	}

	saveAs(path){
		fs.writeFileSync(path, JSON.stringify(this.items), 'utf-8')
	}

	flush(){
		this.items.length = 0
	}

	add(key, data){
		let item = {key, data}
		this.items.push(item)
		return item
	}

	has(key){
		return this.items.find(item => item.key === key) !== undefined
	}

	full(){
		return this.items.length >= this.capacity
	}

	collect(consume){
		for(let item of this.items)
			consume(this.id, item)
	}
}

class One{
	constructor(root, size, capacity){
		this.segments = [...Array(size)].map((_,i) => new Segment(i, root + 'segment-' + i + '.json', capacity))
	}

	init(){
		this.segments.forEach(s => s.init())
	}

	load(){
		this.segments.forEach(s => s.load())
	}

	save(){
		this.segments.forEach(s => s.save())
	}

	saveAs(path){
		this.segments.forEach(s => s.saveAs(path))
	}

	getSegment(key){
		let list = [...Array(this.segments.length)].map((_,i) => i)
		while(list.length){
			let index = Math.floor(Math.random()*list.length)
			let segment = this.segments[index]
			if (!segment.full() && !segment.has(key))
				return segment

			list = list.filter(v => v != index)
		}
		return null
	}

	add(key, data){
		let segment = this.getSegment(key)
		return segment && segment.add(key, data)
	}

	collect(consume){
		for(let segment of this.segments)
			segment.collect( consume )
	}

}

module.exports = {One, Segment}
