import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('projects', function() {
    this.route('calendars');
    this.route('tasks', {
    	path: ':project_id/tasks'
    });
    this.route('teams', {
    	path: ':project_id/teams'
    });
  });
});

export default Router;
