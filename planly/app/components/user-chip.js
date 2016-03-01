import Ember from 'ember';

export default Ember.Component.extend({
	// classNames:["chip"],
		tagName: "li",
		classNames:["collection-item avatar"],
		click: function(){
			$("#teamMembers").css("visibility","visible");
			console.log(this.get('element'));
			$(this.get('element')).clone().removeClass("ember-view").addClass("chip").append("<i class='material-icons'>close</i>").appendTo('#teamMembers');
			$(this.get('element')).hide();


		}
});