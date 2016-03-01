import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		var sessionContent = this.get('session').get('content');
		var email;
		if(sessionContent.provider == 'password') {
			console.log('get email');
			email = sessionContent.currentUser.email;
		} else {
			console.log('get link');
			email = sessionContent.currentUser.link;
		}
		return this.store.query('user', {
            orderBy: 'email', 
            equalTo: email
        }).then(function(array){
        	return array.get('content')[0].record;
        });
	}
});
