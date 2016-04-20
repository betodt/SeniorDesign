import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		$('.datepicker').pickadate({
		  selectMonths: true, // Creates a dropdown to control month
		  selectYears: 15,// Creates a dropdown of 15 years to control year
		  format: 'mmmm d, yyyy',
		});
		$('.dropdown-button').dropdown({
		    inDuration: 300,
		    outDuration: 225,
		    constrain_width: true, // Does not change width of dropdown to that of the activator
		    hover: false, // Activate on hover
		    gutter: 0, // Spacing from edge
		    belowOrigin: true, // Displays dropdown below the button
		    alignment: 'right' // Displays dropdown with edge aligned to the left of button
		  }
		);
		$(document).ready(function(){
		    $('ul.tabs').tabs();
		  });
		
		$(document).ready(function(){
    		$('.tooltipped').tooltip({delay: 50});
 		 });
	}
});
