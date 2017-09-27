
angular.module('customize.controllers.selectProductDetailsCtrl', [])
    .controller('selectProductDetailsCtrl', ['$scope', '$location','$state', 'StorefrontHttpService', '$rootScope',
        function($scope, $location, $state, StorefrontHttpService, $rootScope) {

            var clothDetailDTO;
            var imageDTO;
            var currentCatName;
            $scope.imgPrefix = $rootScope.assetsURLPrefix;
            $scope.frontActive = true;

            $scope.createInitDTO = function () {
                imageDTO = {
                    silhouette : silhouttes[0].id,
                    neckline : neckline[0].id,
                    backline : backline[0].id,
                    sleeves : sleeves[0].id,
                    cloth : fabric[0].id,
                    border : pockets[0].id,
                    embroidery : embroidery[0].id
                }
            };


            $scope.updateDTO = function (data) {
                imageDTO[currentCatName] = data.id;
                StorefrontHttpService.renderProductImage(imageDTO).then(function (success) {
                    $scope.images = success.viewImages;
                    $scope.renderedImage = $scope.images.front;
                }, function (error) {

                });
            };



            $scope.getClothData = function () {
                  StorefrontHttpService.getClothDetail().then(function (success){
                        silhouttes = success[0];
                        neckline = success[1];
                        backline = success[2];
                        sleeves = success[3];
                        fabric = success[4];
                        embroidery = success[5];
                        pockets = success[6];
                      $scope.currentCat = silhouttes;
                      currentCatName = 'silhouttes';
                      $scope.createInitDTO();
                      StorefrontHttpService.renderProductImage(imageDTO).then(function (success) {
                          $scope.images = success.viewImages;
                          $scope.renderedImage = $scope.images.front;
                      }, function (error) {

                      });
                  },function (error){

                  });
                };


            $scope.changeImage = function (pos) {
                if(pos == 1){
                    $scope.frontActive = true;
                    $scope.renderedImage = $scope.images.front;
                }
                else{
                    $scope.frontActive = false;
                    $scope.renderedImage = $scope.images.right;
                }

            };

            $scope.displaySelectedCategory = function (id) {
                    id=id.toString();
                switch (id){
                    case '0':
                            $scope.currentCat = silhouttes;
                            currentCatName = 'silhouette';
                        break;

                    case '1':
                            $scope.currentCat = neckline;
                        currentCatName = 'neckline';

                        break;

                    case '2':
                            $scope.currentCat = backline;
                        currentCatName = 'backline';

                        break;

                    case '3':
                            $scope.currentCat = sleeves;
                        currentCatName = 'sleeves';

                        break;

                    case '4':
                            $scope.currentCat = fabric;
                        currentCatName = 'fabric';

                        break;

                    case '5':
                            $scope.currentCat = embroidery;
                        currentCatName = 'embroidery';

                        break;

                    case '6':
                            $scope.currentCat = pockets;
                        currentCatName = 'pockets';

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
