[node-mongodb-native]: https://github.com/christkv/node-mongodb-native     
[javascript driver]: http://www.mongodb.org/display/DOCS/Manual

# node-mongodb-wrapper

A wrapper for [node-mongodb-native][node-mongodb-native] as close as possible to the [native javascript driver][javascript driver]. Why learn two interfaces?

Yes, we know other people are doing the same thing. This one has been easier to use. 

## Features

1. Minimal interface closely matching the command-line driver: [http://www.mongodb.org/display/DOCS/Manual](http://www.mongodb.org/display/DOCS/Manual)
2. Lazy open/close of connections
3. Most features of [node-mongodb-native][node-mongodb-native]

## Features it doesn't have

1. Connection pooling. Each db will share a single connection. 

## Installation

<pre>
  npm install mongodb-wrapper
</pre>

## Usage

1. You have to tell the db object which collections you're about to use (Harmony Proxies, I need you!)
2. You have to provide callbacks on "actionable" calls (`toArray`, `count`, but not `find`)
3. Otherwise, just like the native [javascript driver][javascript driver]

<pre>
	var mongo = require('mongodb-wrapper')
	var db = mongo.db('localhost', 27017, 'test')
	db.collection('posts')
	
	db.posts.save({title: "A new post", body: "Here is some text"}, function(err, post) {
		db.posts.findOne({_id: doc._id}, function(err, post) {
			db.posts.find().limit(1).toArray(function(err, posts) {
				// posts[0].title == "A new post"
			})
		})
	})      
</pre>

For more examples, [please look at the test suite](https://github.com/idottv/node-mongodb-wrapper/blob/master/lib/mongodb-wrapper.js)



