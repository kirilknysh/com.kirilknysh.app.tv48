include('Javascript/views/MenuView.js');
include('Javascript/core/theme.js');

MAF.application.init({
	views: [
		{ id: 'view-MenuView', viewClass: MenuView }
	],
	defaultViewId: 'view-MenuView',
	settingsViewId: 'view-MenuView'
});