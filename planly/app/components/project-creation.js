import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		closeProjectCreation: function(){
			$('#projectCreation').closeModal()
		},
		openTeamCreation: function(){
			$('#projectCreation').closeModal();
			this.sendAction("openTeamCreation");
		}
	 }
	
});
