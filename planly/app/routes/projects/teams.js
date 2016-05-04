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
	model: function(params) {
		return this.get('store').find('project', params.project_id);
	},
	actions: {
		addTeams: function() {
			console.log('opening team creation in teams');

			var currentProject = this.modelFor(this.routeName);
			$('#teamCreation').prop('currentProject', currentProject);
			$('#teamCreation').openModal();
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

			    newTeam.setProperties({ 'project': project });
				//add to the project
				// project.get('teams').pushObject(newTeam);
				project.save();

			    //add the project to each of the users in the project
			    newTeam.get('members').forEach(function(user){
			    	// user.get('teams').pushObject(newTeam);
			    	user.save();
			    });

			    newTeam.save().then(function(value){ 
				    this.modelFor(this.routeName).reload();
			  	}.bind(this));
			}.bind(this));

			return false;
		},
		cancelTeamCreation: function(){
			console.log(this.routeName);
			if(this.routeName == 'projects.teams')
				return false;
			$('#projectCreation').openModal();
			return false;
		}
	}
});
