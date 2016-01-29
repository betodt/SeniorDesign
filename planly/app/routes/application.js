// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },

  actions: {
    signIn: function(provider) {
      $('#login').openModal();
      /*this.get("session").open("firebase", { provider: provider}).then(function(data) {
        console.log(data.currentUser);
      });*/
    },

    signOut: function() {
      this.get("session").close();
    }
  }
});