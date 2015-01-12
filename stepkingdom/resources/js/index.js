// Client side code
if (Meteor.isClient) {
  Meteor.startup(function() {
    Session.setDefault("yesterdaySteps", 0);
    Session.setDefault("todaySteps", 0);
    Session.setDefault("totalSteps", 0);
  });

  Template.body.helpers({
    stepTotal: function() {      
      return Session.get("totalSteps");
    }
  });
  
  function updateTotalSteps() {
    Session.set("totalSteps", Session.get("yesterdaySteps") + Session.get("todaySteps"));
  }
  
  Template.body.events({
    "submit .set-steps-yesterday": function (event) {
      Session.set("yesterdaySteps", parseInt(event.target.stepsYesterday.value));
      updateTotalSteps();
      return false;
    },
    "submit .set-steps-today": function (event) {
      Session.set("todaySteps", parseInt(event.target.stepsToday.value));
      updateTotalSteps();
      return false;
    }
  });
}