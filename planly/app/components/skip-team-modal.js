import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		closeSkipTeamModal: function(){
			$('#skipTeamModal').closeModal();
		}
	}
});
