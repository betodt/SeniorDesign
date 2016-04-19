import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		this.$(".button-collapse").sideNav();
		this.$('.datepicker').pickadate({
		  selectMonths: true, // Creates a dropdown to control month
		  selectYears: 15 // Creates a dropdown of 15 years to control year
		});
		this.$('.tooltipped').tooltip({delay: 50});
		this.$('.materialboxed').materialbox();
	}
});
