
angular.module('customize.controllers.selectProductDetailsCtrl', [])
    .controller('selectProductDetailsCtrl', ['$scope', '$location','$state', 'StorefrontHttpService', '$rootScope',
        function($scope, $location, $state, StorefrontHttpService, $rootScope) {

            var clothDetailDTO;
            var imageDTO;
            var currentCatName;
            $scope.imgPrefix = $rootScope.assetsURLPrefix;
            $scope.frontActive = true;
            $scope.currentActive = 'silhouette';

            $scope.createInitDTO = function () {
                imageDTO = {
                    silhouette : silhouette[0].id,
                    neckline : neckline[0].id,
                    backline : backline[0].id,
                    sleeves : sleeves[0].id,
                    cloth : fabric[0].id,
                    border : border[0].id,
                    embroidery : embroidery[0].id
                }
            };


            $scope.updateDTO = function (data) {
                console.log(imageDTO);
                
                if(currentCatName === 'fabric') {
                	imageDTO['cloth'] = data.id;
                } else if (currentCatName === 'borders'){
                	imageDTO['border'] = data.id;
                } 
                else {
                	imageDTO[currentCatName] = data.id;
                }
                StorefrontHttpService.renderProductImage(imageDTO).then(function (success) {
                    $scope.images = success.s3ImagePaths;
                    $scope.renderedImage = $scope.images.front;
                }, function (error) {

                });
            };



            $scope.getClothData = function () {
                  StorefrontHttpService.getClothDetail().then(function (success){
                      silhouette = success[0];
                        neckline = success[1];
                        backline = success[2];
                        sleeves = success[3];
                        fabric = success[4];
                        borders = success[5];
                        embroidery = success[6];
                      $scope.currentCat = silhouette;
                      currentCatName = 'silhouette';
                      $scope.createInitDTO();
                      StorefrontHttpService.renderProductImage(imageDTO).then(function (success) {
                          $scope.images = success.s3ImagePaths;
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
                        $scope.currentCat = silhouette;
                        currentCatName = 'silhouette';
                        $scope.currentActive = 'silhouette';
                        break;

                    case '1':
                        $scope.currentCat = neckline;
                        currentCatName = 'neckline';
                        $scope.currentActive = 'neckline';

                        break;

                    case '2':
                        $scope.currentCat = backline;
                        currentCatName = 'backline';
                        $scope.currentActive = 'backline';

                        break;

                    case '3':
                        $scope.currentCat = sleeves;
                        currentCatName = 'sleeves';
                        $scope.currentActive = 'sleeves';

                        break;

                    case '4':
                        $scope.currentCat = fabric;
                        currentCatName = 'fabric';
                        $scope.currentActive = 'fabric';

                        break;

                    case '5':
                        $scope.currentCat = borders;
                        currentCatName = 'borders';
                        $scope.currentActive = 'borders';

                        break;


                    case '6':
                        $scope.currentCat = embroidery;
                        currentCatName = 'embroidery';
                        $scope.currentActive = 'embroidery';

                        break;

                    default:
                        $scope.currentCat = silhouette;
                        $scope.currentActive = 'silhouette';

                }
            };


                var init = function () {
                    $scope.getClothData();
                };
            init();

        }]);
