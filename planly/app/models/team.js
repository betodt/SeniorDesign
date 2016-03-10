import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  created: DS.attr('date'),
  members: DS.hasMany('user',{async: true}),
  tasks: DS.hasMany('task',{async: true}),
  project: DS.belongsTo('project',{async: true})
});
