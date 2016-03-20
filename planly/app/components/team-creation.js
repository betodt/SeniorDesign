import Ember from 'ember';

export default Ember.Component.extend({
	filteredUsers: null, //set by userQuery
	selectedUsers: [], //set by addSelected
	userQuery: function() {
		var input = this.get('team-member');
		if(input != undefined) {
			if(input.length > 0) {
				var newUsers = $('#teamCreation').prop('currentProject').get('users').filter(function(item, index, self){
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
	}.observes('team-member').on('init'),
	actions: {
		addSelected: function(user) {
			this.get('filteredUsers').removeObject(user);
			this.get('selectedUsers').pushObject(user);
		},
		removeSelected: function(user) {
			this.get('selectedUsers').removeObject(user);
			this.get('filteredUsers').pushObject(user);
		},
		closeTeamCreation: function() {
			
			this.sendAction("closeTeamCreation", {
            	name: this.get('team-name'),
            	description: this.get('team-description'),
            	created: new Date(),
            	members: this.get('selectedUsers'),
            	project: $('#teamCreation').prop('currentProject').get('id')
            });

            $('#teamCreation').closeModal();
		}
	}
});