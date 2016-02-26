import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		createSubtask: function() {
        	this.toggleProperty('enabled');

        },
        closeSubtask: function(){
        	console.log("hai");
        	this.sendAction("createSubtask");
        }
	}
});
