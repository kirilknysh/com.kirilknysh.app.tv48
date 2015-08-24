include('Javascript/core/game/gridModel.js');
include('Javascript/core/game/theme-generator.js');

var GameView = new MAF.Class({
	ClassName: 'GameView',

	Extends: MAF.system.FullscreenView,

	createView: function () {
		new MAF.element.Text({
			text: 'tv48',
			styles:{
				vOffset: 50,
				width: this.width,
				fontSize: 60,
				anchorStyle: 'center'
			}
		}).appendTo(this);
	},

	updateView: function () {
		var view = this;

		view.model = new Grid(view.persist.rows, view.persist.cols, view.height * 0.6);
		view.onCellAdd_bound = view.onCellAdd.subscribeTo(view.model, 'addCell', view);
		view.onCellMerge_bound = view.onCellMerge.subscribeTo(view.model, 'mergeCells', view);
		view.onScoreUpdate_bound = view.onScoreUpdate.subscribeTo(view.model, 'scoreUpdate', view);

		ThemeGenerator.generateCellsStyles(view.model.cellWidth);

		view.renderGrid(view.model, view);
		view.renderGameStats(view.model, view);

		view.model.generateCells(2, 2);

		view.onNavigate_bound = view.navigate.subscribeTo(view, 'onNavigate', view);

		view.isNavigating = false;
	},

	hideView: function () {
		var view = this;

		view.onCellAdd_bound.unsubscribeFrom(view.model, 'addCell');
		view.onCellMerge_bound.unsubscribeFrom(view.model, 'mergeCells');
		view.onScoreUpdate_bound.unsubscribeFrom(view.model, 'scoreUpdate');
		view.onNavigate_bound.unsubscribeFrom(view, 'onNavigate');

		view.model.destroy();
		view.model = null;
		this.elements.gridBg.suicide();
		this.elements.bestScoreStat.suicide();
		this.elements.currentScoreStat.suicide();
		this.elements.statsContainer.suicide();
	},

	renderGrid: function (grid, container) {
		var view = this,
			gridBg = new MAF.element.Container({
				styles: {
					vOffset: 170 + grid.cellHeight,
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

	renderGameStats: function (grid, container) {
		var statWidth = container.width / 5,
			statHeight = grid.cellHeight * 0.6,
			bestScore = currentAppConfig.get('bestScore');

		if (bestScore < 0) {
			bestScore = 0;
		}

		var statsContainer = new MAF.element.Container({
			styles: {
				vOffset: 150,
				hOffset: 0,
				width: container.width,
				height: grid.cellHeight
			}
		});

		this.elements.currentScoreStat = new MAF.element.Container({
			ClassName: 'CurrentScoreStat',
			styles: {
				vOffset: 0,
				hOffset: container.width / 2 - statWidth - 50,
				width: statWidth,
				height: statHeight
			},
			content: [
				new MAF.element.Text({
					label: grid.getCurrentScore(),
					styles: {
						anchorStyle: 'center',
						width: statWidth,
						height: statHeight,
						fontSize: 30
					}
				})
			]
		}).appendTo(statsContainer);

		this.elements.bestScoreStat = new MAF.element.Container({
			ClassName: 'BestScoreStat',
			styles: {
				vOffset: 0,
				hOffset: container.width / 2 + 50,
				width: statWidth,
				height: statHeight
			},
			content: [
				new MAF.element.Text({
					label: bestScore,
					styles: {
						anchorStyle: 'center',
						width: statWidth,
						height: statHeight,
						fontSize: 30
					}
				})
			]
		}).appendTo(statsContainer);

		statsContainer.appendTo(container);

		this.elements.statsContainer = statsContainer;
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

	startOver: function () {
		this.model.reset();
		this.model.generateCells(2, 2);
	},

	onCellAdd: function (e) {
		var cell = e.payload;

		this.renderCell(cell.row, cell.col, cell.value)
			.appendTo(this.elements.gridBg)
			.animate({
				duration: 0.15,
				scale: 0.9,
				callback: function () {
					this.element.animate({
						duration: 0.15,
						scale: 1
					});
				}
			});
	},

	onCellMerge: function (e) {
		var cell = e.payload;

		if (cell && cell.element) {
			cell.element
				.animate({
					duration: 0.15,
					scale: 1.1,
					callback: function () {
						this.element.animate({
							duration: 0.15,
							scale: 1
						});
					}
				});
		}
	},

	onScoreUpdate: function (e) {
		var currentScore = e.payload,
			bestScore = currentAppConfig.get('bestScore');

		if (currentScore < 0) {
			currentScore = 0;
		}

		this.elements.currentScoreStat.content[0].setText(currentScore);

		if (currentScore > bestScore) {
			currentAppConfig.set('bestScore', currentScore);
			this.elements.bestScoreStat.content[0].setText(e.payload);
		}
	},

	renderCell: function (row, col, value) {
		var grid = this.model,
			element;

		element = new MAF.element.Container({
			styles: {
				vOffset: grid.cellGap + (row * (grid.cellHeight + grid.cellGap)),
				hOffset: grid.cellGap + (col * (grid.cellWidth + grid.cellGap)),
				width: grid.cellWidth,
				height: grid.cellHeight
			},
			content: [
				new MAF.element.Text({
					label: value,
					styles: {
						anchorStyle: 'center',
						width: grid.cellWidth,
						height: grid.cellHeight
					}
				})
			]
		});

		grid.setCellElement(row, col, element);

		return element;
	},

	navigate: function (event) {
		var view = this,
			direction = this.getDirection(event);

		if (!direction || view.isNavigating) {
			return;
		}

		view.isNavigating = true;
		view.model.navigate(direction, function __onNavigationEnd__(anyMovements) {
			if (anyMovements) {
				view.model.generateCells(1, 2);
				view.checkEnding();
			}
			view.isNavigating = false;
		});
	},

	getDirection: function (event) {
		var key;

		if (event && event.payload) {
			key = event.payload.direction;
		} else if (event && event.Event && event.Event.detail) {
			key = event.Event.detail.direction;
		}

		return key;
	},

	checkEnding: function () {
		if (!this.model.canMove()) {
			this.finishGame(this.model.getCurrentScore());
		}
	},

	finishGame: function (finishScore) {
		this.displayFinishAlert(finishScore);
	},

	displayFinishAlert: function (score) {
		var view = this;

		new MAF.dialogs.Alert({
			title: $_('GameOver'),
			message: widget.getLocalizedString('EndingMessage', [ score ]),
			buttons: [{
				label: $_('TryAgain'),
				callback: function () {
					view.startOver();
				}
			}],
			focusOnCompletion: this,
			cancelCallback: function () { MAF.application.previousView(); }
		}).show();
	}
});