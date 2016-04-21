import Ember from 'ember';

export default Ember.Route.extend({
	passedProject: null,
	beforeModel: function() {
		if (this.get('session').get('isAuthenticated')) {
		  return; // Already authenticated
		}
		
		return this.get("session").fetch().then(function(success) {
			console.log("fetched: " + success);
		}, function(error) {
			console.log("not fetched: " + error);
			this.transitionTo('/');
		}.bind(this));
	},
	model: function() {
		var sessionContent = this.get('session').get('content');
		var email;
		if(sessionContent.provider === 'password') {
			console.log('get email');
			email = sessionContent.currentUser.email;
		} else {
			console.log('get link');
			email = sessionContent.currentUser.id;
		}
		return this.store.query('user', {
            orderBy: 'email', 
            equalTo: email
        }).then(function(array){
        	return array.get('content')[0].record;
        });
	},
	actions: {
		openTeamCreation: function(project){
		  var user = this.modelFor(this.routeName);
		  project.users.push(user);
		  //create the project record
		  var newProject = this.store.createRecord('project', {
		    name: project.name,
		    goal: project.goal,
		    created: project.created,
		    deadline: project.deadline,
		    users: project.users
		  });

		  //add the project to each of the users in the project
		  newProject.get('users').forEach(function(user){
		    // user.get('projects').pushObject(newProject);
		    user.save();
		  });

		  user.set('lastProjectOpen', newProject);
		  user.save();

		  newProject.save().then(function(value){ 
		    user.reload();
		  });

		  $('#teamCreation').prop('currentProject', newProject);
		  $('#teamCreation').openModal();

		  return false;
		},
		editProject: function(project) {
			this.set('passedProject', project);
			console.log(this.passedProject.get('name'));
			$('#project-edit-modal').prop('currentProject', project);
			$('#project-edit-modal').openModal();
		},
		deleteProject: function(projectId){
			$('#project-close-modal').openModal();
			this.store.findRecord('project', projectId).then(function(project) {
				this.closingProject = project;
			}.bind(this));
		},
		confirmDelete: function(data) {
			if(this.closingProject.get('name') == data.confirmedName) {
				this.closingProject.destroyRecord();
			}
		}
	}
});
