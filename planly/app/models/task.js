import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  created: DS.attr('date'),
  deadline: DS.attr('date'),
  likes: DS.attr('number'),
  attachments: DS.attr('array'),
  subtasks: DS.hasMany('subtask'),
  teams: DS.hasMany('team'),
  members: DS.hasMany('user'),
  project: DS.belongsTo('project')
});
