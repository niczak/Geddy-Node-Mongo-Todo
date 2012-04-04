var Todo = function () 
{
 
  // all 3 elements are required
  this.defineProperties({
    title: {type: 'string', required: true}
  , id: {type: 'string', required: true}
  , status: {type: 'string', required: true}
  });
 
  // verify title is present
  this.validatesPresent('title');
  
  // verify title is at least 5 characters
  this.validatesLength('title', {min: 5});
 
  // function to validate if a status is open or done
  this.validatesWithFunction('status', function (status) {
    return status == 'open' || status == 'done';
  });
 
};

Todo = geddy.model.register('Todo', Todo);

