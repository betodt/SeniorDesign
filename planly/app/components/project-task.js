import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
	},
	actions: {
		completeTask: function(){
			this.get('model').toggleProperty('completed');
			console.log(this.get('model').get('completed'));
		},
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
