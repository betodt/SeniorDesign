import Ember from 'ember';

export default Ember.Component.extend({
	classNames:["animated"],
	classNameBindings:['fade:fadeOut'],
	filteredUsers: null, //set by userQuery
	selectedUsers: [], //set by addSelected
	userQuery: function() {
	        var input = this.get('subtask-assigned');
	        if(input != undefined) {
	                if(input.length > 0) {
	                        var newUsers = this.get('members').filter(function(item, index, self){
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
	}/*.observes('subtask-assigned').on('init')*/,
	notVisable: function(){
		if(this.get('fade'))
			this.set('isVisible',false);
	}.observes("fade").on("init"),
	actions:{
        closeSubtask: function(){
        	this.set("fade",true);
        	console.log("hai");
        }
	}
});


