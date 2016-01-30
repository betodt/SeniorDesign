import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        signIn: function(provider) {
            this.sendAction('signIn', provider);
        }
    }
});
