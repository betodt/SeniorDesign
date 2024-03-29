import Ember from 'ember';

export default Ember.Component.extend({
	filteredUsers: null, //set by userQuery
	selectedUsers: [],
	userQuery: function() {
		var input = this.get('project-edit-member');
		if(input != undefined) {
			if(input.length > 0) {
				var newUsers = this.store.peekAll('user').filter(function(item, index, self){
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
	}.observes('project-edit-member').on('init'),
	didpdateAttrs: function() {
		console.log('currentProject is: ' + this.$('#project-edit-modal').prop('currentProject'));
		var cp = this.get('currentProject');
		if(cp) {
			this.set('selectedUsers', cp.get('users'));
			console.log(cp.get('users'));

		}
	},
	mouseEnter: function() {
		this.set('currentProject', this.$('#project-edit-modal').prop('currentProject'));
		this.set('selectedUsers', this.get('currentProject').get('users'));
		this.set('name', this.get('currentProject').get('name'));
		console.log(this.get('currentProject').get('name'));
	},
	actions: {
		closeProjectCreation: function(){
			$('#project-edit-modal').closeModal();
		},
		addSelected: function(user) {
			this.get('filteredUsers').removeObject(user);
			this.get('selectedUsers').pushObject(user);
		},
		removeSelected: function(user) {
			this.get('selectedUsers').removeObject(user);
			this.get('filteredUsers').pushObject(user);
		},
		updateProject: function() {
			this.get('currentProject').save();
			$('#project-edit-modal').closeModal();
		}
	}
});
