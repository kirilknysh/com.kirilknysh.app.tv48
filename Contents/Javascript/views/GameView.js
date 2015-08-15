include('Javascript/core/game/gridModel.js');

var GameView = new MAF.Class({
	ClassName: 'GameView',

	Extends: MAF.system.FullscreenView,

	initialize: function () {
		var view = this;

		view.parent();

		view.model = new Grid(this.persist.rows, this.persist.cols);
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

		view.renderGrid(view.model, view);
	},

	renderGrid: function (grid, container) {
		var gridBg = new MAF.element.Container({
			styles: {
				vOffset: 100,
				hOffset: (container.width - grid.gridWidth) / 2,
				width: grid.gridWidth,
				height: grid.gridHeight,
				backgroundColor: Theme.getStyles('GridBackground', 'backgroundColor'),
			}
		}).appendTo(container);

		for (var i = 0; i < grid.rows; i++) {
			for (var j = 0; j < grid.cols; j++) {
				new MAF.element.Container({
					styles: {
						vOffset: grid.cellGap + (i * (grid.cellHeight + grid.cellGap)),
						hOffset: grid.cellGap + (j * (grid.cellWidth + grid.cellGap)),
						width: grid.cellWidth,
						height: grid.cellHeight,
						backgroundColor: Theme.getStyles('CellPlaceholderBackground', 'backgroundColor'),
					}
				}).appendTo(gridBg);
			}
		}
	},

	updateView: function () {
		var view = this;
	},

	hideView: function () {
		var view = this;
	}
});