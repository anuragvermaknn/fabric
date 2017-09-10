angular.module('app.cart', [
    'cart.controllers'
])

.config(function config($stateProvider) {
    $stateProvider.state('myCartDetail', {
            url: '/myCart/checkout',
            templateUrl: 'cart/views/cart.tpl.html',
            controller: 'cartCtrl'
        })
        .state('myCart', {
            url: '/myCart',
            templateUrl: 'cart/views/cartInitial.tpl.html',
            controller: 'cartCtrlInitial'
        });
});
