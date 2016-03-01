// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() { 
    return this.get("session").fetch().catch(function() {});
  },

  model: function() {
    return this.store.findAll('user');
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
      var __this__ = this;
      
      this.get("session").open("firebase", provider).then(function(data) {
        if(provider.provider == "google" || provider.provider == "facebook") {
          __this__.store.query('user', {
            orderBy: 'email', 
            equalTo: data.currentUser.cachedUserProfile.link
          }).then(function(success){
            console.log(success);
            if(success.get('content').get('length') > 0) {
              console.log("found in here");
            } else {
              console.log("not in here");
              var user = __this__.store.createRecord('user', {
                firstName: data.currentUser.cachedUserProfile.given_name,
                lastName: data.currentUser.cachedUserProfile.family_name,
                email: data.currentUser.cachedUserProfile.link,
                picUrl: data.currentUser.profileImageURL,
                joined: new Date()  
              });
              if(provider.provider == "facebook") {
                user.set('firstName', data.currentUser.cachedUserProfile.first_name);
                user.set('lastName', data.currentUser.cachedUserProfile.last_name);
              }
              user.save();
            }
          }, function(error){
            console.log(error);
          });
        } else {
            console.log("User exists");
        }
        __this__.transitionTo('/projects');
      }, function(error) {
        console.log("Could not log in: " + error);
      });
    },
    openTeamCreation: function(data){
      $('#teamCreation').openModal();
    },

    signOut: function() {   
      this.get("session").close();
      this.transitionTo('/');
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
            console.log(data2.uid);
          
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