import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  picUrl: DS.attr('string'),
  joined: DS.attr('date'),
  projects: DS.hasMany('project', { inverse: 'users', async: true }),
  teams: DS.hasMany('team',{async: true}),
  tasks: DS.hasMany('task',{async: true}),
  lastProjectOpen: DS.belongsTo('project', {async: true}),
  comments: DS.hasMany('comment', {async:true});
  fullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  })
});
