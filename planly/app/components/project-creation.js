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
				this.setProperties({enabled: false, filteredUsers: null});
			}
		}
	}.observes('project-member').on('init'),
	isValid: function() {
		if(this.get('project-name') && this.get('project-deadline') && this.get('project-goal')) {
			console.log('didnt fill out');
			return true;
		}
		return false; 
	}.observes('project-name', 'project-deadline', 'project-goal').on('init'),
	resetFields: function() {
		this.setProperties({
			'project-name': '',
			'project-goal': '',
			'project-deadline': '',
			'project-member': '',
			'selectedUsers': []
		});
		$('label[for="project-name"]').removeClass('active');
		$('#project-name').removeClass('valid');
		$('label[for="project-goal"]').removeClass('active');
		$('#project-goal').removeClass('valid');
		$('label[for="project-deadline"]').removeClass('active');
		$('#project-deadline').removeClass('valid');
		$('label[for="project-member"]').removeClass('active');
		$('#project-member').removeClass('valid');
	},
	actions:{
		closeUsers: function() {
			this.setProperties({enabled: false, 'project-member': ''});
		},
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
			this.resetFields();
			$('#projectCreation').closeModal();
		},
		openTeamCreation: function(){
            console.log('opening team creation');
            if(!this.isValid()) {
            	console.log('somethings wrong');
            	this.set('errorMessage', 'Make sure you gave your project a name, goal, and deadline.');
            	return false;
            }
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
