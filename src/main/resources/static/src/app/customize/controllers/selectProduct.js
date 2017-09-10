angular.module('customize.controllers.selectProduct', [])
    .controller('selectProduct', ['$scope', '$location','$state', 'StorefrontHttpService',
        function($scope, $location, $state, StorefrontHttpService) {



            $scope.arrayBufferToBase64 = function( buffer ) {
                var binary = '';
                var bytes = new Uint8Array( buffer );
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode( bytes[ i ] );
                }
                return window.btoa( binary );
            };

            $scope.detailedStyle = function () {
               var createDetailRenderDTO = {

                };
            };

            StorefrontHttpService.getProductDetails().then(function (success){
                $scope.categoryData = success[0];
                console.log($scope.categoryData);

            }, function (error){

            });



    }]);
