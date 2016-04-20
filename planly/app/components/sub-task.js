import Ember from 'ember';

export default Ember.Component.extend({
	classNames:["animated"],
	classNameBindings:['fade:fadeOut'],
	notVisable: function(){
		if(this.get('fade'))
			this.set('isVisible',false);
	}.observes("fade").on("init"),
	actions:{
		createSubtask: function() {
        	this.toggleProperty('enabled');

        },
        closeSubtask: function(){
        	this.set("fade",true);
        	console.log("hai");
        	this.sendAction("createSubtask");
        }
	}
});


