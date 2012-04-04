// require the MongoDB wrapper
var mongo = require('mongodb-wrapper');

// setup database
geddy.db = mongo.db('localhost', 27017, 'todo');

// add collection to database
geddy.db.collection('todos');


// add uncaught-exception handler in prod-like environments
if (geddy.config.environment != 'development') {
  process.addListener('uncaughtException', function (err) {
    geddy.log.error(JSON.stringify(err));
  });
}

// array hung off geddy global, data will be stored until 
// server is killed/restarted
//geddy.todos = []; - no longer needed since this is using MongoDB for storing persistent data

// create a blank model-adapter object, and add the Todo model adapter onto it
geddy.model.adapter = {};
geddy.model.adapter.Todo = require(process.cwd() + '/lib/model_adapters/todo').Todo;