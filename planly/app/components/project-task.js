import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
	},
	actions: {
		removeTask: function(taskId) {
			this.sendAction('removeTask', taskId);
		}
	}
});
