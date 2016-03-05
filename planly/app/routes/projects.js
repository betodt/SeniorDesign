import Ember from 'ember';

export default Ember.Route.extend({
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
	model: function() {
		var sessionContent = this.get('session').get('content');
		var email;
		if(sessionContent.provider == 'password') {
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
            // this.sendAction("createProject", );
            //console.log('opening team creation in projects');

            //get the current user
            var user = this.modelFor(this.routeName);

            //create the project record
            var project = this.store.createRecord('project', {
            	name: project.name,
            	goal: project.goal,
            	created: project.created,
            	deadline: project.deadline,
            	users: project.users
        	});

        	//push the user
            project.get('users').pushObject(user);

            //add the project to each of the users in the project
            project.get('users').forEach(function(user){
            	user.get('projects').pushObject(project);
            	user.save();
            });

            project.save();

            //bubble up to application router to open up the next modal
        	return true;
		}
	}
});
