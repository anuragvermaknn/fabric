angular.module('app.pdp', [
    'pdp.controllers'
])

.config(function config($stateProvider) {
    $stateProvider.state('description', {
            url: '/:cName/description/id=:id',
            templateUrl: 'pdp/views/pdp.tpl.html',
            controller: 'PdpCtrl'
        });
});
