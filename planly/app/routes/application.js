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
    signIn: function(provider, email, password) {
      var provider = {
        provider: provider,
        email: email,
        password: password
      };
      this.get("session").open("firebase", provider).then(function(data) {
        console.log(data.currentUser);
      });
    },

    signOut: function() {   
      this.get("session").close();
    },

    submit: function(data) {
      var ref = new Firebase("https://planly.firebaseio.com");
      ref.createUser({
        email    : data.email,
        password : data.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          console.log(this);
        }
      });
    }
  }
});