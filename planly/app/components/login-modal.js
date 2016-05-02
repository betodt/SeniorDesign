import Ember from 'ember';

export default Ember.Component.extend({
    // errorMessage: "hello world",
    actions: {
        signIn: function(provider) {
            this.sendAction('signIn', {
                provider: provider,
                email: this.get('email'),
                password: this.get('password') 
            });
        },
        toggleForm: function() {
        	this.toggleProperty('enabled');
        },
        submit: function(data) {
        	console.log("modal submitting");
            
        	this.sendAction('submit', data);
            this.sendAction('signIn', {
                provider: "password",
                email: data.email,
                password: data.password
            });
        }
    }
});
