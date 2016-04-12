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
				project: project
			});	
			
			project.get('tasks').pushObject(newTask);
			project.save();

			project.get('users').forEach(function(user) {
				user.get('tasks').pushObject(newTask);
				newTask.get('members').pushObject(user);
				user.save();
			});

			newTask.save();
		},
		createSubtask: function() {
		},
		initCreateTask: function() {
			$('#createTask').prop('selectedProject', this.modelFor(this.routeName));
		}
	}
});
