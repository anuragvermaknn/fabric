/**
 * The `vendor_files.js` property in Gruntfile.js holds files to be automatically
 * concatenated and minified with our project source files.
 *
 * NOTE: Use the *.min.js version when compiling for production.
 * Otherwise, use the normal *.js version for development
 *
 */

module.exports = {
    js: [
        // utility libraries
        'vendor/jquery/dist/jquery.min.js',
        // Angular components
        'vendor/angular/angular.min.js',
        'vendor/angular-ui-router/release/angular-ui-router.min.js',
        'vendor/angular-resource/angular-resource.min.js',
        // 'vendor/angular-mocks/angular-mocks.js',

        // Local storage
        'vendor/angular-local-storage/dist/angular-local-storage.min.js',

        // Modernizer
        'vendor/modernizr/modernizr.js',

        // Foundation
        'vendor/foundation/js/foundation.min.js',

        //slick
        'vendor/slick-carousel/slick/slick.js',
        'vendor/angular-slick-carousel/dist/angular-slick.min.js',

        //angular material
        'vendor/angular-animate/angular-animate.min.js',
        'vendor/angular-aria/angular-aria.min.js',
        'vendor/angular-messages/angular-messages.min.js',
        'vendor/angular-material/angular-material.js',
        //login
        'vendor/ng-facebook/ngfacebook.js',
        //g signin
        'vendor/angular-directive.g-signin/google-plus-signin.js',
        //full-screen-mode
        'vendor/angular-fullscreen/angular-fullscreen.js',
        //countDown
        'vendor/humanize-duration.js',
        'vendor/moment.js',
        'vendor/timer/angular-timer.min.js',

        //circular percentage
        'vendor/orbicular/orbicular.js',
        //image-appear
        'vendor/image-appear/dist/ng-image-appear.min.js',
        //device and os detector
        'vendor/ng-device-detector/ng-device-detector.min.js',
        'vendor/re-tree/re-tree.min.js',

        //Pagination
        'vendor/angularUtils-pagination/dirPagination.js',
        'vendor/freshdesk/freshdesk.js',
        'vendor/sticky/angular-sticky.js',
        'vendor/google-chart/ng-google-chart.min.js'



    ],
    css: [],
    assets: []
};
