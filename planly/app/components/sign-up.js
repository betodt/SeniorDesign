import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		submit: function() {
			console.log("submitting");
			this.sendAction('submit', {
				firstName: this.get('first'),
				lastName: this.get('last'),
				email: this.get('email'),
				password: this.get('password')
			});
			this.store.createRecord('user', {
				firstName: this.get('first'),
				lastName: this.get('last'),
				email: this.get('email'),
				password: this.get('password')
			});
		}
	}
});
