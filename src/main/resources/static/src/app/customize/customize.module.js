angular.module('app.customize', [
    'customize.controllers'
])
    .config(function config($stateProvider) {
        $stateProvider.state('mycustomization', {
            url: '/customize',
            templateUrl: 'customize/views/selectProduct.tpl.html',
            controller: 'selectProduct'
        });
});
