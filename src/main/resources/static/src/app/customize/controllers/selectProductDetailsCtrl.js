
angular.module('customize.controllers.selectProductDetailsCtrl', [])
    .controller('selectProductDetailsCtrl', ['$scope', '$location','$state', 'StorefrontHttpService',
        function($scope, $location, $state, StorefrontHttpService) {

            var clothDetailDTO;

            clothDetailDTO = {

            }


            // $scope.createDTO()


            $scope.getClothData = function () {
                  StorefrontHttpService.getClothDetail().then(function (success){
                        silhouttes = success[0];
                        neckline = success[1];
                        backline = success[2];
                        console.log(backline);
                        sleeves = success[3];
                        fabric = success[4];
                        embroidery = success[5];
                        pockets = success[6];
                      $scope.currentCat = silhouttes;

                      StorefrontHttpService.renderProductImage(clothDetailDTO).then(function (success) {
                          $scope.renderedImage = success.image;
                      }, function (error) {

                      });
                  },function (error){

                  });
                };

            $scope.displaySelectedCategory = function (id) {
                    id=id.toString();
                switch (id){
                    case '0':
                            $scope.currentCat = silhouttes;
                        break;

                    case '1':
                            $scope.currentCat = neckline;
                        break;

                    case '2':
                            $scope.currentCat = backline;
                        break;

                    case '3':
                            $scope.currentCat = sleeves;
                        break;

                    case '4':
                            $scope.currentCat = fabric;
                        break;

                    case '5':
                            $scope.currentCat = embroidery;
                        break;

                    case '6':
                            $scope.currentCat = pockets;
                        break;

                    default:
                        $scope.currentCat = silhouttes;

                }
            };


                var init = function () {
                    $scope.getClothData();
                };
            init();

        }]);
