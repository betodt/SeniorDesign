import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  picUrl: DS.attr('string'),
  joined: DS.attr('date'),
  projects: DS.hasMany('project'),
  teams: DS.hasMany('team'),
  tasks: DS.hasMany('task')
});
