import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  goal: DS.attr('string'),
  created: DS.attr('date'),
  deadline: DS.attr('date'),
  tasks: DS.hasMany('task'),
  teams: DS.hasMany('team'),
  users: DS.hasMany('user')
});
