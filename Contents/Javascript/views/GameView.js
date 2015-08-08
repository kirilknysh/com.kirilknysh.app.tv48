var GameView = new MAF.Class({
	ClassName: 'GameView',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		var view = this;

		view.parent();
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
		var view = this;
	},

	hideView: function () {
		var view = this;
	}
});