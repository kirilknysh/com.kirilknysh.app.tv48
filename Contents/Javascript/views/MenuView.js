var MenuView = new MAF.Class({
	ClassName: 'MenuView',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();
	},

	createView: function () {
		var view = this;
		
		new MAF.element.Text({
			text: 'tv48',
			styles:{
				width: view.width,
				fontSize: 60,
				anchorStyle: 'center'
			}
		}).appendTo(view);
	},

	updateView: function () {

	}
});