import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		createSubtask: function() {
			console.log("hellooooo");
        	this.toggleProperty('enabled');

        }
	}
});
