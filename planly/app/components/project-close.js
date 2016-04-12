import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		confirmDelete: function() {
			this.sendAction('confirmDelete', {
				confirmedName: this.get('project-name-confirm')
			});
		}
	}
});
