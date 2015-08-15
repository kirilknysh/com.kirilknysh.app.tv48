include('Javascript/views/MenuView.js');
include('Javascript/views/GameView.js');
include('Javascript/core/theme.js');

MAF.application.init({
	views: [
		{ id: 'view-MenuView', viewClass: MenuView, data: {
			rows: 4, cols: 4,
			minRows: 3, minCols: 3,
			maxRows: 7, maxCols: 7
		} },
		{ id: 'view-GameView', viewClass: GameView }
	],
	defaultViewId: 'view-MenuView',
	settingsViewId: 'view-MenuView'
});