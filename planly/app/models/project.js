import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  goal: DS.attr('string'),
  created: DS.attr('date'),
  deadline: DS.attr('date'),
  tasks: DS.hasMany('task',{async: true}),
  teams: DS.hasMany('team',{async: true}),
  users: DS.hasMany('user', { inverse: 'projects', async: true }),
  pctComplete: Ember.computed('tasks.@each.completed', function(){
    if(this.get('tasks').get('length') === 0) return 0;
  	return parseInt((this.get('tasks').filterBy('completed', true).get('length')/this.get('tasks').get('length') * 100));
  })
});
