const fs = require('fs')

class Segment{
	constructor(id, path, capacity){
		this.items = []
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

	rem(key){
		let item = this.items.find(item => item.key === key)
		if (item){
			delete this.items[this.items.indexOf(item)]
		}

		return item !== undefined
	}

	get(key){
		return this.items.find(item => item.key === key)
	}

	set(key, data){
		this.items.find(item => item.key === key).data = {...data}
		return true
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
		this.segments = [...Array(size)].map((_,i) => this.createSegment(i, root + 'segment-' + i + '.json', capacity))
	}

	createSegment(index, path, capacity){
		return new Segment(index, path, capacity)
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

	saveAs(root){
		this.segments.forEach(s => s.saveAs(root + 'segment-' + s.id))
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

	get(key){
		let segment = this.segments.find(s => s.has(key))
		return segment && segment.get(key)
	}

	set(key, data){
		let segment = this.segmentByKey(key)
		return segment && segment.set(key, data)
	}

	has(key){
		return this.segments.find(s => s.has(key)) !== undefined
	}

	segmentByKey(key){
		return this.segments.find(s => s.has(key))
	}

	segment(index){
		return index >= 0 &&
			index < this.segments.length &&
			this.segments[index] ||
			new Segment(index, '')
	}

}

module.exports = {One, Segment}
