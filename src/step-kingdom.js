// simple-todo.js
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function() {
      if (Session.get("hideCompleted")) {
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      }
      else {
        return Tasks.find({}, {sort:{createdAt: -1}});
      }
    }, 
    hideCompleted: function() {
      return Session.get("hideCompleted");
    }
  });
  
  Template.body.events({    
    // Submit event for new task form
    "submit .new-task": function (event) {
      var text = event.target.text.value;
      
      // Add new task to list
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      
      console.log(event)
      
      // Clear new task form
      event.target.text.value = "";
      
      // Prevent default form submit
      return false;
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });
  
  Template.task.events({
    // Toggle task checkbox event
    "click .toggle-checked": function() {
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    // Delete task button event
    "click .delete": function() {
      Tasks.remove(this._id)
    }
  });
}