import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        signIn: function(provider, email, password) {
            this.sendAction('signIn', {
                provider: provider,
                email: email,
                password: password 
            });
            $('#login').closeModal();
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
            $('#login').closeModal();
        }
    }
});
