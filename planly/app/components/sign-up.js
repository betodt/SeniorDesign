import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		submit: function() {
			console.log("submitting");
			this.sendAction('submit');
		}
	}
});
