angular.module('app.profile', [
    'profile.controllers'
])

.config(function config($stateProvider) {
    $stateProvider.state('myProfile', {
            url: '/myProfile',
            templateUrl: 'profile/views/myProfile.tpl.html',
            controller: 'profileCtrl'
        })
        .state('myOrders', {
            url: '/myOrderHistory',
            templateUrl: 'profile/views/myOrders.tpl.html',
            controller: 'orderCtrlAll'
        })
        .state('myTestSeries', {
            url: '/myTestSeries',
            templateUrl: 'profile/views/myTestSeries.tpl.html',
            controller: 'testCtrlAll'
        })
        .state('tests', {
            url: '/myTestSeries/:pkgId/myTests',
            templateUrl: 'profile/views/myTestsAllView.tpl.html',
            controller: 'testListCtrl'

        });
});
