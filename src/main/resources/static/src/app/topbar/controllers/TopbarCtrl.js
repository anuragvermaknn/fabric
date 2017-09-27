angular.module('topbar.controllers.TopbarCtrl', [])
    .controller('TopbarCtrl', ['$state', '$scope','$location','$rootScope',
        function ($state, $scope, $location, $rootScope) {

            $rootScope.$state = $state;
            $scope.imgPrefix = $rootScope.assetsURLPrefix;

            $scope.exitCanvas = function () {
                document.getElementById("exit-canvas").click();

            };




        }
    ]);
