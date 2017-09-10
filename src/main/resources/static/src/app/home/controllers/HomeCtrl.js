angular.module('home.controllers.HomeCtrl', [])
    .controller('HomeCtrl', ['$state', '$rootScope', '$scope', 'HomeService', '$location', '$anchorScroll',
        'StorefrontHttpService', 'CartService','$window',

        function ($state, $rootScope, $scope, HomeService, $location, $anchorScroll, StorefrontHttpService,
                  CartService, $window) {

            $scope.activated = true;
            $scope.testseriesData = [];
            $scope.booksData = [];
            $scope.title = 'Home Page';
            isPageLoading = true;

            $scope.addToCart = function (data) {
                CartService.addCartItem(data);
            };

            loadDataTestSeries = function () {
                var testSeriesId = 1;
                StorefrontHttpService.getPackagesByCategoryId(testSeriesId)
                    .then(function (data) {
                        $scope.testseriesData = data.data;
                        $scope.activated = false;
                    }, function (error) {

                    });
            };


            loadDataVideoData = function () {
                var videosId = 5;
                StorefrontHttpService.getPackagesByCategoryId(videosId)
                    .then(function (data) {
                        $scope.videoData = data.data;
                        $scope.activated = false;
                    }, function (error) {

                    });
            };

            $scope.openInNewWindow = function (os) {
                if(os === 1){
                    var url = 'https://play.google.com/store/apps/details?id=com.adda247.app&referrer=utm_source%3Dadda-store%26utm_medium%3Dbanner-store%26utm_campaign%3Dstore-banner%26anid%3Dadmob';
                    $window.open(url, "_blank");
                }
                else{
                    var url = "https://itunes.apple.com/us/app/adda247/id1255054632?ls=1&mt=8";
                    $window.open(url, "_blank");
                }
            }


            loadDataCourseBooks = function () {
                var booksId = 2;
                StorefrontHttpService.getPackagesByCategoryId(booksId)
                    .then(function (data) {

                        $scope.booksData = data.data;

                    }, function (error) {

                    });
            };

            loadDataEbookData = function () {
                var eBooksId = 4;
                StorefrontHttpService.getPackagesByCategoryId(eBooksId)
                    .then(function (data) {
                        $scope.ebookData = data.data;
                        $scope.activated = false;
                    }, function (error) {
                        loadDataEbookData();
                    });
            };


            // $scope.addToCartMagazine = function() {
            //     CartService.addCartItem($scope.magData);
            //     var toast = $mdToast.simple().content('Item added to cart!').action('BUY NOW').position('bottom right').hideDelay(9000).highlightAction(true);
            //     $mdToast.show(toast).then(function(response) {
            //         if (response == 'ok') {
            //             $state.go('myCart');
            //         }
            //     });
            // };
            //


            init = function () {
                $anchorScroll();
                loadDataTestSeries();
                loadDataCourseBooks();
                loadDataVideoData();
                loadDataEbookData();

            };

            //scrollToTop
            $(window).scroll(function () {
                if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
                    $('#return-to-top').fadeIn(200); // Fade in the arrow
                } else {
                    $('#return-to-top').fadeOut(200); // Else fade out the arrow
                }
            });
            $('#return-to-top').click(function () { // When arrow is clicked
                $('body,html').animate({
                    scrollTop: 0 // Scroll to top of body
                }, 500);
            });

            init();


        }
    ]);
