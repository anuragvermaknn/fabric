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
        });
});
