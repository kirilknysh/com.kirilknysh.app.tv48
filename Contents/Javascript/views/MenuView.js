var MenuView = new MAF.Class({
	ClassName: 'MenuView',

	Extends: MAF.system.FullscreenView,

	MENU_WIDTH: 500,

	initialize: function () {
		var view = this;

		view.parent();

		view.store('rows', view.config.data.rows);
		view.store('cols', view.config.data.cols);

		view.store('minRows', view.config.data.minRows);
		view.store('maxRows', view.config.data.maxRows);

		view.store('minCols', view.config.data.minCols);
		view.store('maxCols', view.config.data.maxCols);

		if (!currentAppConfig.get('bestScore')) {
			//seems like a bug in MAF: can't store 0 as a number;
			currentAppConfig.set('bestScore', -1);
		}
	},

	createView: function () {
		var view = this,
			container;

		new MAF.element.Text({
			text: 'tv48',
			styles:{
				vOffset: 50,
				width: view.width,
				fontSize: 60,
				anchorStyle: 'center',
				color: '#f7b901'
			}
		}).appendTo(view);


		container = new MAF.element.Container({
			styles: {
				vOffset: 350,
				hOffset: (view.width - view.MENU_WIDTH) / 2,
				width: view.MENU_WIDTH,
				height: 200
			}
		}).appendTo(view);
		new MAF.control.TextButton({
			label: widget.getLocalizedString('Rows', [view.retrieve('rows')]),
			styles: {
				width: view.MENU_WIDTH,
				height: 60,
				color: Theme.getStyles('BaseGlow', 'color'),
				fontSize: 40
			},
			textStyles:{
				hOffset: 60
			},
			content: [
				new MAF.element.Text({
					label: FontAwesome.get('chevron-right'),
					styles: {
						height: 'inherit',
						width: 'inherit',
						hOffset: -10,
						anchorStyle: 'rightCenter'
					}
				}),
				new MAF.element.Text({
					label: FontAwesome.get('chevron-left'),
					styles: {
						height: 'inherit',
						width: 'inherit',
						hOffset: 10,
						anchorStyle: 'leftCenter'
					}
				})
			],
			events:{
				onFocus: function () {
					this.animate({
						duration: 0.2,
						backgroundColor: Theme.getStyles('BaseFocus', 'backgroundColor'),
						color: Theme.getStyles('BaseFocus', 'color')
					});
				},
				onBlur: function () {
					this.animate({
						duration: 0.2,
						backgroundColor: Theme.getStyles('BaseGlow', 'backgroundColor'),
						color: Theme.getStyles('BaseGlow', 'color')
					});
				},
				onNavigate: function (event) {
					var key;

					if (event && event.payload) {
						key = event.payload.direction;
					} else if (event && event.Event && event.Event.detail) {
						key = event.Event.detail.direction;
					}

					if (!key) {
						return;
					}

					if (key === 'right' && view.retrieve('rows') < view.retrieve('maxRows')) {
						view.store('rows', view.retrieve('rows') + 1);
					} else if (key === 'left' && view.retrieve('rows') > view.retrieve('minRows')) {
						view.store('rows', view.retrieve('rows') - 1);
					}

					this.setText(widget.getLocalizedString('Rows', [view.retrieve('rows')]));
				}
			}
		}).appendTo(container);
		new MAF.control.TextButton({
			label: widget.getLocalizedString('Cols', [view.retrieve('cols')]),
			styles: {
				width: view.MENU_WIDTH,
				height: 60,
				color: Theme.getStyles('BaseGlow', 'color'),
				vOffset: 100,
				fontSize: 40
			},
			textStyles:{
				hOffset: 60
			},
			content: [
				new MAF.element.Text({
					label: FontAwesome.get('chevron-right'),
					styles: {
						height: 'inherit',
						width: 'inherit',
						hOffset: -10,
						anchorStyle: 'rightCenter'
					}
				}),
				new MAF.element.Text({
					label: FontAwesome.get('chevron-left'),
					styles: {
						height: 'inherit',
						width: 'inherit',
						hOffset: 10,
						anchorStyle: 'leftCenter'
					}
				})
			],
			events:{
				onFocus: function () {
					this.animate({
						duration: 0.2,
						backgroundColor: Theme.getStyles('BaseFocus', 'backgroundColor'),
						color: Theme.getStyles('BaseFocus', 'color')
					});
				},
				onBlur: function () {
					this.animate({
						duration: 0.2,
						backgroundColor: Theme.getStyles('BaseGlow', 'backgroundColor'),
						color: Theme.getStyles('BaseGlow', 'color')
					});
				},
				onNavigate: function (event) {
					var key;

					if (event && event.payload) {
						key = event.payload.direction;
					} else if (event && event.Event && event.Event.detail) {
						key = event.Event.detail.direction;
					}

					if (!key) {
						return;
					}

					if (key === 'right' && view.retrieve('cols') < view.retrieve('maxCols')) {
						view.store('cols', view.retrieve('cols') + 1);
					} else if (key === 'left' && view.retrieve('cols') > view.retrieve('minCols')) {
						view.store('cols', view.retrieve('cols') - 1);
					}

					this.setText(widget.getLocalizedString('Cols', [view.retrieve('cols')]));
				}
			}
		}).appendTo(container);


		new MAF.control.TextButton({
			label: $_('Start'),
			styles: {
				width: view.MENU_WIDTH,
				height: 100,
				hOffset: (view.width - view.MENU_WIDTH) / 2,
				vOffset: view.height - 200,
				backgroundColor: Theme.getStyles('BaseGlow', 'backgroundColor'),
				color: Theme.getStyles('BaseGlow', 'color'),
				fontSize: 50
			},
			textStyles: {
				anchorStyle: 'center'
			},
			events:{
				onFocus: function () {
					this.animate({
						duration: 0.2,
						backgroundColor: Theme.getStyles('BaseFocus', 'backgroundColor'),
						color: Theme.getStyles('BaseFocus', 'color'),
						scale: 1.2
					});
				},
				onBlur: function () {
					this.animate({
						duration: 0.2,
						backgroundColor: Theme.getStyles('BaseGlow', 'backgroundColor'),
						color: Theme.getStyles('BaseGlow', 'color'),
						scale: 1
					});
				},
				onSelect: function () {
					MAF.application.loadView('view-GameView', {
						rows: view.retrieve('rows'),
						cols: view.retrieve('cols')
					});
				}
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