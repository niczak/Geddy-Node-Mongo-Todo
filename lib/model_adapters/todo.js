var Todo = new (function () 
{
  this.all = function(callback) {
    var todos = [];

    // use find() method which is part of the MongoDB wrapper to
    // get all documents in the collection then sort by status
    // in decending alpha order and by title in ascending alpha order
    // finally send to array which triggers the query to start
    geddy.db.todos.find().sort({status: -1, title: 1}).toArray(function(err, docs) {
      // if errors occur fire callback and report error
      if(err) {
        return callback(err, null);
      }

      // iterate through the documents, create new
      // todo model instances for each document and
      // push them to a todos array
      for(var i in docs) {
        todos.push(geddy.model.Todo.create(docs[i]))
      }

      // fire callback function and pass todos
      return callback(null, todos);
    });
  }

  this.load = function(id, callback) {
    var todo;
    // find a todo in the database using the findOne() method
    // which is part of the MongoDB wrapper
    geddy.db.todos.findOne({id:id}, function(err, doc) {
      if(err) {
        // if err fire callback and report error
        return callback(err, null);
      }
      if(doc) {
        // if doc create a model instance out of it
        todo = geddy.model.Todo.create(doc);
      }
      // fire callback and pass todo
      return callback(null, todo);

    })
  
  }

  this.save = function(todo, opts, callback) {
    // sometimes we wont need to pass to a callback
    // so just use an empty function in those cases
    if(typeof callback != 'function') {
      callback = function(){};
    }

    // you should not send functions to Mongo
    // so make sure we are only using properties
    cleanTodo = {
      id: todo.id,
      saved: todo.saved,
      title: todo.title,
      status: todo.status
    };

    // ensure todo is valid by invoking model
    // if invalid fire callback to report errors
    todo = geddy.model.Todo.create(cleanTodo);
    if (!todo.isValid()) {
      return callback(todo.errors, null);
    }

    // check to see if todo id already exists using the findOne()
    // method which is part of the MongoDB wrapper in all cases:
    // err, update or save we fire the callback
    geddy.db.todos.findOne({id : todo.id}, function(err, doc) {
      if(err) {
        return callback(todo.errors, todo);
      }
      
      // if we already have the to do item, update it with the new values
      if (doc) {
        geddy.db.todos.update({id: todo.id}, cleanTodo, function(err, docs) {
          return callback(todo.errors, todo);
        });
      }
      // if we don't already have the to do item, save a new one
      else {
        todo.saved = true;
        geddy.db.todos.save(todo, function(err, docs) {
          return callback(err, docs);
        });
      }
    });
  }

  this.remove = function(id, callback) {
    if(typeof callback != 'function') {
      callback = function(){};
    }
    // use the remove() method which is part of the MongoDB wrapper
    // to remove a document from the database matching the id passed
    // to the method
    geddy.db.todos.remove({id:id}, function(err, res) {
      // if there is an err, fire callback and report it
      callback(err);
    });
  }

})();

exports.Todo = Todo;