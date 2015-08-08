include('Javascript/views/MenuView.js');
include('Javascript/views/GameView.js');
include('Javascript/core/theme.js');

MAF.application.init({
	views: [
		{ id: 'view-MenuView', viewClass: MenuView, data: { rows: 4, cols: 4 } },
		{ id: 'view-GameView', viewClass: GameView }
	],
	defaultViewId: 'view-MenuView',
	settingsViewId: 'view-MenuView'
});