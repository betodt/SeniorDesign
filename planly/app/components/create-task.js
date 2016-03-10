import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		createSubtask: function() {
        	this.toggleProperty('enabled');
        },
        createTask: function() {
        	this.sendAction('createTask', {
        		description: this.get('task-name'),
        		created: new Date(),
        		deadline: new Date(this.get('task-deadline'))
        	});
        }
	}
});
