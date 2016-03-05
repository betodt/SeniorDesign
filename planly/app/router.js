import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('projects', function() {
    this.route('calendars');
    this.route('tasks');
    this.route('teams');
  });
});

export default Router;
