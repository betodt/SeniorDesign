import Ember from 'ember';

export default Ember.Route.extend({
	subtasks: [],
	beforeModel: function() {
		if (this.get('session').get('isAuthenticated')) {
		  return; // Already authenticated
		}
		
		return this.get("session").fetch().then(function(success) {
			console.log("fetched");
		}, function(error) {
			console.log("not fetched");
			this.transitionTo('/');
		}.bind(this));
	},
	model: function(params) {
		return this.get('store').find('project', params.project_id);
	},
	willTransition: function(transition){
		console.log("tasks transitioning");
	},
	actions: {
		removeTask: function(taskId) {
			this.store.findRecord('task', taskId).then(function(task) {
				task.destroyRecord();
			});
		},
		createTask: function(task) {
			var project = this.modelFor(this.routeName);

			var newTask = this.store.createRecord('task', {
				description: task.description,
				created: task.created,
				deadline: task.deadline,
				project: project,
				members: task.users,
				completed: false
			});	

			task.subtasks.forEach(function(subtask){
				console.log("setting task "+subtask+" with "+newTask);
				subtask.set('task', newTask);
			    // newTask.get('subtasks').pushObject(subtask);
			    subtask.save();
			});
			
			// project.get('tasks').pushObject(newTask);
			project.save();

			newTask.get('members').forEach(function(user) {
				// user.get('tasks').pushObject(newTask);
				user.save();
			});

			newTask.save().then(function(value){
			    project.reload();
		  	});

			return false;
		},
		createSubtask: function() {
		},
		initCreateTask: function() {
			$('#createTask').prop('selectedProject', this.modelFor(this.routeName));
		}
	}
});
