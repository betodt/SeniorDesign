import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		$('.tooltipped').tooltip({delay: 50});
	}
});
