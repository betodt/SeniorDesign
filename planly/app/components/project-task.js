import Ember from 'ember';

export default Ember.Component.extend({
	classNames:['animated'],
	classNameBindings:['fade:fadeOut:fadeIn'],fade:false,
	actions: {
		completeTask: function(){
			this.get('model').toggleProperty('completed');
			this.set("fade",true);
			console.log(this.get('model').get('completed'));
			this.get('model').save();
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
		postComment: function(){
			console.log('task');
			this.sendAction('postComment', this.get('comment'), this.get('model'));
			this.set('comment', '');
		},
		doNothin: function(){},
	}

});
