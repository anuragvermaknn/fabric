angular.module('app.customize', [
    'customize.controllers'
])
    .config(function config($stateProvider) {
        $stateProvider.state('mycustomization', {
            url: '/customize',
            templateUrl: 'customize/views/selectProduct.tpl.html',
            controller: 'selectProduct'
        }).state('detailedStyle', {
            url: '/customize/details/:id',
            templateUrl: 'customize/views/selectProductDetails.tpl.html',
            controller: 'selectProductDetailsCtrl'
        }).state('measurements', {
            url: '/customize/details/measurements/:id',
            templateUrl: 'customize/views/selectMeasurements.tpl.html',
            controller: 'measurementsCtrl'
        });
});



