angular.module('customize.controllers.selectProduct', [])
    .controller('selectProduct', ['$scope', '$location','$state', 'StorefrontHttpService',
        function($scope, $location, $state, StorefrontHttpService) {


            StorefrontHttpService.getProductDetails().then(function (success){
                $scope.categoryData = success;
                console.log($scope.categoryData);

            }, function (error){

            });



        }]);
