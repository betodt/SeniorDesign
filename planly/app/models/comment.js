import DS from 'ember-data';

export default DS.Model.extend({
  comment: DS.attr('string'),
  user: DS.belongsTo('user',{async:true})
});
