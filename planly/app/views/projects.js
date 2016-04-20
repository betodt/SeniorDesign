import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		$(".button-collapse").sideNav();
		$('.datepicker').pickadate({
		  selectMonths: true, // Creates a dropdown to control month
		  selectYears: 15 // Creates a dropdown of 15 years to control year
		}),
		$('.tooltipped').tooltip({delay: 50});
	}
});
