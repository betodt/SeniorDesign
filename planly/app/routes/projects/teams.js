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
		}
	}
});
