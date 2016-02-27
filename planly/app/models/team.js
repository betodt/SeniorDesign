import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  created: DS.attr('date'),
  members: DS.hasMany('user'),
  tasks: DS.hasMany('task'),
  project: DS.belongsTo('project')
});
