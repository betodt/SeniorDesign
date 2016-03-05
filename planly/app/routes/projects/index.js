import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		if (this.get('session').get('isAuthenticated')) {
		  return; // Already authenticated
		}
		
		return this.get("session").fetch().then(function(success) {
			console.log("fetched");
		}, function(error) {
			console.log("not fetched");
			this.transitionTo('/');
		}.bind(this));
	},
	model: function() {
		var sessionContent = this.get('session').get('content');
		var email;
		if(sessionContent.provider == 'password') {
			console.log('get email');
			email = sessionContent.currentUser.email;
		} else {
			console.log('get link');
			email = sessionContent.currentUser.id;
		}
		return this.store.query('user', {
            orderBy: 'email', 
            equalTo: email
        }).then(function(array){
        	return array.get('content')[0].record;
        });
	}
});
