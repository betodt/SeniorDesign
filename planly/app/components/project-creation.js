import Ember from 'ember';

export default Ember.Component.extend({
	userQuery: function() {
		var input = this.get('project-member');
		if(input != undefined) {
			if(input.length > 0) {
				var newUsers = this.get('users').filter(function(item, index, self){
					console.log(item);
					if(item.get('fullName').toLowerCase().indexOf(input.toLowerCase()) > -1 ) {
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
		createProject: function() {
			console.log('Component project');
			this.sendAction("createProject");
		},
		closeProjectCreation: function(){
			$('#projectCreation').closeModal();
		},
		openTeamCreation: function(){
            // this.sendAction("createProject", );
            console.log('opening team creation');
			$('#projectCreation').closeModal();
			this.sendAction("openTeamCreation", {
            	name: this.get('project-name'),
            	goal: this.get('project-goal'),
            	created: new Date(),
            	deadline: this.get('project-deadline')
            });
		}
	 }
	
});
