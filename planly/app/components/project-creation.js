import Ember from 'ember';

export default Ember.Component.extend({
	filteredUsers: null, //set by userQuery
	selectedUsers: [], //set by addSelected
	userQuery: function() {
		var input = this.get('project-member');
		if(input != undefined) {
			if(input.length > 0) {
				var newUsers = this.get('users').filter(function(item, index, self){
					if(item.get('firstName').toLowerCase().substr(0, input.length) ===  input.toLowerCase() || item.get('lastName').toLowerCase().substr(0, input.length) ===  input.toLowerCase()) {
						return true;
					}
					else 
						return false;
				});
				this.setProperties({enabled: true, filteredUsers: newUsers});
			}
			else {
				this.setProperties({enabled: false});
			}
		}
	}.observes('project-member').on('init'),
	actions:{
		addSelected: function(user) {
			this.get('filteredUsers').removeObject(user);
			this.get('selectedUsers').pushObject(user);
		},
		removeSelected: function(user) {
			this.get('selectedUsers').removeObject(user);
			this.get('filteredUsers').pushObject(user);
		},
		createProject: function() {
			console.log('Component project');
			this.sendAction("createProject");
		},
		closeProjectCreation: function(){
			$('#projectCreation').closeModal();
		},
		openTeamCreation: function(){
            console.log('opening team creation');
			$('#projectCreation').closeModal();
			this.sendAction("openTeamCreation", {
            	name: this.get('project-name'),
            	goal: this.get('project-goal'),
            	created: new Date(),
            	deadline: new Date(this.get('project-deadline')),
            	users: this.get('selectedUsers')
            });
		}
	 }
	
});
