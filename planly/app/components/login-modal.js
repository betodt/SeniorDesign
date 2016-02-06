import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        signIn: function(provider, email, password) {
            this.sendAction('signIn', provider, email, password);
        },
        toggleForm: function() {
        	this.toggleProperty('enabled');
        },
        submit: function(data) {
        	console.log("modal submitting");
        	this.sendAction('submit', data);
        }
    }
});
