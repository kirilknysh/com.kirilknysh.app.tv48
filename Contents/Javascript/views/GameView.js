include('Javascript/core/game/gridModel.js');

var GameView = new MAF.Class({
	ClassName: 'GameView',

	Extends: MAF.system.FullscreenView,

	createView: function () {
		new MAF.element.Text({
			text: 'tv48',
			styles:{
				width: this.width,
				fontSize: 60,
				anchorStyle: 'center'
			}
		}).appendTo(this);
	},

	updateView: function () {
		var view = this;

		view.model = new Grid(this.persist.rows, this.persist.cols);
		view.onCellAdd_bound = view.onCellAdd.subscribeTo(view.model, 'addCell', this);

		view.renderGrid(view.model, view);

		view.model.generateCells(2, 2);
	},

	hideView: function () {
		var view = this;

		view.onCellAdd_bound.unsubscribeFrom(view.model, 'addCell');

		this.elements.gridBg.suicide();
	},

	renderGrid: function (grid, container) {
		var gridBg = new MAF.element.Container({
			styles: {
				vOffset: 100,
				hOffset: (container.width - grid.gridWidth) / 2,
				width: grid.gridWidth,
				height: grid.gridHeight,
				backgroundColor: Theme.getStyles('GridBackground', 'backgroundColor')
			}
		}).appendTo(container);

		this.elements.gridBg = gridBg;

		for (var i = 0; i < grid.rows; i++) {
			for (var j = 0; j < grid.cols; j++) {
				this.renderCellPlaceholder(i, j).appendTo(gridBg);
			}
		}
	},

	renderCellPlaceholder: function (row, col) {
		var grid = this.model;

		return new MAF.element.Container({
			styles: {
				vOffset: grid.cellGap + (row * (grid.cellHeight + grid.cellGap)),
				hOffset: grid.cellGap + (col * (grid.cellWidth + grid.cellGap)),
				width: grid.cellWidth,
				height: grid.cellHeight,
				backgroundColor: Theme.getStyles('CellPlaceholderBackground', 'backgroundColor')
			}
		});
	},

	onCellAdd: function (e) {
		var cell = e.payload;

		this.renderCell(cell.row, cell.col, cell.value)
			.appendTo(this.elements.gridBg);
	},

	renderCell: function (row, col, value) {
		var grid = this.model,
			cell;

		return new MAF.element.Container({
			styles: {
				vOffset: grid.cellGap + (row * (grid.cellHeight + grid.cellGap)),
				hOffset: grid.cellGap + (col * (grid.cellWidth + grid.cellGap)),
				width: grid.cellWidth,
				height: grid.cellHeight,
				backgroundColor: Theme.getStyles('CellBackground', 'backgroundColor')
			},
			content: [
				new MAF.element.Text({
					width: grid.cellWidth,
					height: grid.cellHeight,
					label: value,
					styles: {
						anchorStyle: 'center'
					}
				})
			]
		});
	}
});