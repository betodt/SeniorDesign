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
	isValid: function() {
		if(this.get('team-name') && this.get('team-description')) {
			console.log('didnt fill out');
			return true;
		}
		return false; 
	}.observes('team-name', 'team-description').on('init'),
	resetFields: function() {
		this.setProperties({
			'team-name': '',
			'team-description': '',
			'team-member': '',
			'selectedUsers': []
		});
		$('label[for="team-name"]').removeClass('active');
		$('#team-name').removeClass('valid');
		$('label[for="team-description"]').removeClass('active');
		$('#team-description').removeClass('valid');
		$('label[for="team-member"]').removeClass('active');
		$('#team-member').removeClass('valid');
	},
	actions: {
		closeUsers: function(){
		    this.setProperties({enabled: false, 'team-member': ''});
		},
		addSelected: function(user) {
			this.get('filteredUsers').removeObject(user);
			this.get('selectedUsers').pushObject(user);
		},
		removeSelected: function(user) {
			this.get('selectedUsers').removeObject(user);
			this.get('filteredUsers').pushObject(user);
		},
		cancelTeamCreation: function(){
			$('#teamCreation').closeModal();
			this.sendAction('cancelTeamCreation');
		},
		openSkipTeamModal: function(){
			$('#teamCreation').closeModal();
			$('#skipTeamModal').openModal();
		},
		closeTeamCreation: function() {
			if(!this.isValid()) {
				console.log('somethings wrong');
				this.set('errorMessage', 'Make sure you gave your team a name and description.')
				return false;
			}
			
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