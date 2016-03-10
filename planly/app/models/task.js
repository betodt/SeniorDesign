import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  created: DS.attr('date'),
  deadline: DS.attr('date'),
  likes: DS.attr('number'),
  attachments: DS.attr('string'),
  subtasks: DS.hasMany('subtask'),
  teams: DS.hasMany('team',{async: true}),
  members: DS.hasMany('user',{async: true}),
  project: DS.belongsTo('project',{async: true})
});
