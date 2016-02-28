import Ember from 'ember';

export default Ember.Component.extend({
	isValid: function() {
		if(this.get('first') && this.get('last') && this.get('email') && this.get('password') && this.get('passwordConfirm')) {
			console.log('didnt fill out');
			return true;
		}
		return false; 
	}.observes('first', 'last', 'email', 'password', 'passwordConfirm').on('init'),
	validationObserver: function(){
		if(this.get('password') != this.get('passwordConfirm')) {
			// alert("passwords dont match!");
			$('#passwordConfirm').addClass('invalid');
			return false;
		}
		return true;
	}.observes('password', 'passwordConfirm').on('init'),
	actions: {
		submit: function() {
			console.log("submitting");
			console.log(this.validationObserver());
			console.log(this.isValid());
			if(!this.validationObserver() || !this.isValid()) {
				console.log('somethings wrong');
				return false;
			}

			this.sendAction('submit', {
				firstName: this.get('first'),
				lastName: this.get('last'),
				email: this.get('email'),
				password: this.get('password')
			});
		}
	}
});
