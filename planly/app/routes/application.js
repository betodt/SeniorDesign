// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() { 

    return this.get("session").fetch().catch(function() {});
  },

  actions: {
    openModal: function(){
      $('#login').openModal();
    },
    openProjectModel: function(){
      $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
        $('#projectCreation').openModal();
      },
    signIn: function(provider) {
      this.get("session").open("firebase", provider).then(function(data) {
        console.log(data.currentUser);
      });
    },
    openTeamCreation: function(){
      $('#teamCreation').openModal()
    },

    signOut: function() {   
      this.get("session").close();
    },

    submit: function(data) {
      var __this__ = this;
      var ref = new Firebase("https://planly.firebaseio.com");
      var profPic;
      
      ref.createUser({
        email    : data.email,
        password : data.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          __this__.session.open("firebase", {
            provider: "password",
            email: data.email,
            password: data.password
          }).then(function(data2) {
            console.log(data2.currentUser);
          
            __this__.store.createRecord('user', {
             firstName: data.firstName,
             lastName: data.lastName,
             email: data.email,
             picUrl: data2.currentUser.profileImageURL,
             joined: new Date()
           }).save();
            
          });
        }
      });
    }
  }
});