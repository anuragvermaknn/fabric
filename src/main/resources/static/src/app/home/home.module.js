angular.module('app.home', [
    'home.controllers',
    'home.services',
    'home.directives'
])

    .config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'home/views/home.tpl.html',
            title: 'Online Banking Test Series for SBI PO, Clerk & IBPS PO Clerk Exams'
        })
            .state('mHome', {
                url: '/mHome',
                templateUrl: 'home/views/mHome.tpl.html'
            });
    });
