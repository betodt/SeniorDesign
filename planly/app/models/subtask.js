import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  created: DS.attr('date'),
  deadline: DS.attr('date'),
  likes: DS.attr('number'),
  attachments: DS.attr('array'),
  task: DS.belongsTo('task',{async: true}),
  teams: DS.attr('has-many',{async: true}),
  members: DS.hasMany('user',{async: true}),
  project: DS.belongsTo('project',{async: true})
});
