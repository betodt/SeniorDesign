import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
	},
	actions: {
		removeTask: function(taskId) {
			this.sendAction('removeTask', taskId);
		},
		openEditTaskModal: function(){
             $('#editTaskModal').openModal();
		},
		didInsertElement: function(){
			console.log('added task');
		},
		doNothin: function(){}
	}

});
