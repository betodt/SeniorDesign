import Ember from 'ember';

export default Ember.Component.extend({
	// classNames:["chip"],
	tagName: "li",
	classNames:["collection-item", "avatar", "animated"],
	classNameBindings:['fade:fadeOut', 'isChip:chip'],
	actions: {
		addSelected: function() {
			if(this.get('isChip')) return;
			this.set("fade",true);
			$("#teamMembers").css("visibility","visible");
			// $(this.get('element')).clone().removeClass("ember-view").addClass("chip").append("<i class='material-icons'>close</i>").appendTo('#teamMembers');
			$(this.get('element')).hide();
			this.sendAction('addSelected', this.get('user'));
			
		},
		removeSelected: function() {
			if(!this.get('isChip')) return;

			this.set('isVisible', false);

			this.sendAction('removeSelected', this.get('user'));
		}
		
	}
});