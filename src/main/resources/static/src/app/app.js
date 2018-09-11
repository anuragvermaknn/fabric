angular.module('storefront', [

        /**
         * Dependencies must be injected in specific order:
         * 1) AngularJS dependencies
         * 2) Compiled HTML templates
         * 3) Common Services, Directives, Filters and Utilities
         * 4) App Layout component (e.g. Layout or Frame)
         * 5) Other App components (e.g. Topbar, About, etc)
         */

        // AngularJS dependencies
        'ui.router',
        'ngResource',
        'ngMaterial',
        'ngMessages',
       // 'ngFacebook',
        'directive.g+signin',
        // Include compiled HTML templates
        'app.templates',
        'slickCarousel',
        // Common/shared code
        'app.common',
        //full-screen
        'FBAngular',
        // Layout
        'app.layout',
        //image-appear
        'ngImageAppear',
        //osDetect
        'ng.deviceDetector',
        //Pagination controls
        'angularUtils.directives.dirPagination',
        
        // Components
        'app.topbar',
        'app.home',
        'app.pdp',
        'app.cart',
        'app.orderStatus',
        'app.profile',
        'app.customize',
        'config'
    ])
    .config(appConfig)
    // .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    //     localStorageServiceProvider
    //         .setPrefix('myApp')
    //
    // }])

.run(['$state', '$rootScope', '$window', '$mdDialog', '$mdMedia', 'StorefrontHttpService',
    'SFLocalStorageService', 'deviceDetector', '$mdToast', 'assetsURLPrefix',

    function($state, $rootScope, $window, $mdDialog, $mdMedia, StorefrontHttpService, SFLocalStorageService,
        deviceDetector, $mdToast, assetsURLPrefix) {

        $rootScope.assetsURLPrefix = assetsURLPrefix;
//        (function() {
//            // If we've already installed the SDK, we're done
//            if (document.getElementById('facebook-jssdk')) {
//                return;
//            }
//
//            // Get the first script element, which we'll use to find the parent node
//            var firstScriptElement = document.getElementsByTagName('script')[0];
//
//            // Create a new script element and set its id
//            var facebookJS = document.createElement('script');
//            facebookJS.id = 'facebook-jssdk';
//
//            // Set the new script's source to the source of the Facebook JS SDK
//            facebookJS.src = '//connect.facebook.net/en_US/all.js';
//
//            // Insert the Facebook JS SDK into the DOM
//            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
//        }());




        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        $rootScope.online = true;




        if (typeof cpandroidjsbridge === 'undefined') {
            $rootScope.isApp = false;
        } else {
            $rootScope.isApp = true;
        }



        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });


        var deviceData = deviceDetector;

        var isBrowserOutdated = function() {
            if (((deviceData.browser === 'chrome' && parseInt(deviceData.browser_version) <= 33) || (deviceData.browser === 'firefox' && parseInt(deviceData.browser_version) <= 25)) && deviceData.raw.os.android == false) {
                return true;
            } else {
                return false;
            }
        };

        if (isBrowserOutdated()) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                templateUrl: 'topbar/views/browserAlert.tpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            });
        }
    }
]);


appConfig.$inject = [ '$urlRouterProvider', '$httpProvider'];

function appConfig( $urlRouterProvider, $httpProvider) {

  //  $facebookProvider.setAppId('123456789098');
 //   $facebookProvider.setPermissions("email,user_likes");
    $urlRouterProvider.otherwise('/home');
    $httpProvider.interceptors.push('HttpInterceptor');

}
