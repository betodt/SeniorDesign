import Ember from 'ember';

import layout from '../templates/components/login-modal';

export default Ember.Component.extend({
	beforeModel: function() {
	  return this.get("session").fetch().catch(function() {});
	},
    actions: {
        signIn: function(provider) {
          this.get("session").open("firebase", { provider: provider}).then(function(data) {
            console.log(data.currentUser);
          });
        },

        signOut: function() {
          this.get("session").close();
        },
        openForm: function() {
        	$('#signup').removeClass("hide");
        	$('#signupButton').addClass("hide");
        }
    },
    layout: layout
});
