import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        signIn: function(provider) {
            this.sendAction('signIn', provider);
        },
        toggleForm: function() {
        	this.toggleProperty('enabled');
        },
        submit: function() {
        	console.log("modal submitting");
        	this.sendAction('submit');
        }
    }
});
