angular.module('layout.controllers.LayoutCtrl', [])
    .controller('LayoutCtrl', function($scope, $rootScope, CartService, $state) {
        $scope.$state = $state;

        $scope.smallScreen = function() {
            var width = window.innerWidth;;
            if (width <= 600) {
                $rootScope.isStoreWeb = false;
                return true;
            }
            $rootScope.isStoreWeb = true;
            return false;
        };
        $scope.smallScreen();


    });