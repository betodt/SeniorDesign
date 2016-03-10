import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		removeTask: function(taskId) {
			this.sendAction('removeTask', taskId);
		}
	}
});
