import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		doNothin: function(){},

		projectLink: function(route, projectObject) {
			this.sendAction('projectLink', route, projectObject);
		},
		deleteProject: function(projectId) {
			this.sendAction('deleteProject', projectId);
		},
		editProject: function(projectObject) {
			this.sendAction('editProject', projectObject);
		}
	}
});
