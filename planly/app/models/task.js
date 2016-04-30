import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  created: DS.attr('date'),
  deadline: DS.attr('date'),
  completed: DS.attr('boolean'),
  likes: DS.attr('number'),
  comments: DS.hasMany('comment',{async:true}),
  subtasks: DS.hasMany('subtask', {async: true}),
  teams: DS.hasMany('team',{async: true}),
  members: DS.hasMany('user',{async: true}),
  project: DS.belongsTo('project',{async: true})
});


