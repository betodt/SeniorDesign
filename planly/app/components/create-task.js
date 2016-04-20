import Ember from 'ember';

export default Ember.Component.extend({
        filteredUsers: null, //set by userQuery
        selectedUsers: [], //set by addSelected
        subtasks: [],

        didInsertElement: function() {
                this.sendAction('initCreateTask');
        },
        didRender: function() {
            console.log('inserting');
            this.$('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15,// Creates a dropdown of 15 years to control year
                format: 'mmmm d, yyyy',
             });
        },
        userQuery: function() {
                var input = this.get('members-assigned');
                if(input != undefined) {
                        if(input.length > 0) {
                                var newUsers = this.$('#createTask').prop('selectedProject').get('users').filter(function(item, index, self){
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
        }.observes('members-assigned').on('init'),
	actions:{
		createSubtask: function() {
            this.get('subtasks').push("hello");
            console.log(this.subtasks);
            this.rerender();
        
                },
                createTask: function() {
                	this.sendAction('createTask', {
                		description: this.get('task-name'),
                		created: new Date(),
                		deadline: new Date(this.get('task-deadline'))
                	});
                },
                openAssignModal: function(){
                        this.sendAction('openAssignModal');
                },
                addSelected: function(user) {
                        // this.get('filteredUsers').removeObject(user);
                        this.get('selectedUsers').pushObject(user);
                    
                       
                },
                removeSelected: function(user) {
                        this.get('selectedUsers').removeObject(user);
                        this.get('filteredUsers').pushObject(user);

                        console.log(this.get('selectedUsers'));
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
                },
            }

    });
