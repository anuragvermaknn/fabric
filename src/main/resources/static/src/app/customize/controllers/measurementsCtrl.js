angular.module('customize.controllers.measurementsCtrl', [])
    .controller('measurementsCtrl', ['$scope','$state', '$stateParams',
        function($scope, $state, $stateParams) {

        $scope.id = $stateParams.id;



        }]);
