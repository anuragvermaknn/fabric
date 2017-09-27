angular.module('home.controllers.HomeCtrl', [])
    .controller('HomeCtrl', ['$state', '$rootScope', '$scope', 'HomeService', '$location', '$anchorScroll',
        'StorefrontHttpService', 'CartService','$window',

        function ($state, $rootScope, $scope, HomeService, $location, $anchorScroll, StorefrontHttpService,
                  CartService, $window) {

            init = function () {
                $anchorScroll();

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
