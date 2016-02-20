import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('project', function() {
    this.route('tasks');
    this.route('calendar');
    this.route('team');
  });
});

export default Router;
