import Ember from 'ember';

import layout from '../templates/components/login-modal';

export default Ember.Component.extend({
    actions: {
        toggleModal: function() {
            this.toggleProperty('enabled');
        }
    },
    layout: layout
});
