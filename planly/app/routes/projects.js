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
            console.log('opening team creation in projects');

            //get the current user
            var user = this.modelFor(this.routeName);

            //push the user
            project.users.push(user);

            //bubble up to application router to open up the next modal
        	return true;
		},
		closeTeamCreation: function(team) {
			
		    //create the project record
		    var newTeam = this.store.createRecord('team', {
		    	name: team.name,
		    	description: team.description,
		    	created: team.created,
		    	members: team.members
			});

			this.store.findRecord('project', team.project).then(function(project) {
			    console.log(project);

			    newTeam.setProperties({ 'project': project });
				//add to the project
				project.get('teams').pushObject(newTeam);
				project.save();

			    //add the project to each of the users in the project
			    newTeam.get('members').forEach(function(user){
			    	user.get('teams').pushObject(newTeam);
			    	user.save();
			    });

			    newTeam.save();
			});
		}
	}
});
