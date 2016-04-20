import Ember from 'ember';

export default Ember.Component.extend({
	classNames:['animated'],
	classNameBindings:['fade:fadeOut:fadeIn'],fade:false,
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
		doNothin: function(){},

		fadeOut: function(){
			this.set("fade",true);
		}
	}

});
