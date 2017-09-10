angular.module('profile.controllers.testCtrlAll', [])
    .controller('testCtrlAll', ['$scope', '$location', '$anchorScroll', 'anchorSmoothScroll', '$http', '$state',
        'StorefrontHttpService', 'LoginService', '$window', 'TestSeriesPortalService', '$rootScope',
        function ($scope, $location, $anchorScroll, anchorSmoothScroll, $http, $state, StorefrontHttpService,
                  LoginService, $window, TestSeriesPortalService, $rootScope) {


            var testDetails;
            $rootScope.blur = false;

            $(window).on("blur focus", function (e) {
                var prevType = $(this).data("prevType");

                if (prevType != e.type) { //  reduce double fire issues
                    switch (e.type) {
                        case "blur":
                            // $rootScope.blur = true;
                            break;
                        case "focus":
                            if ($rootScope.blur) {
                                reloadPage();
                            }
                            break;
                    }
                }
                $(this).data("prevType", e.type);
            });
            $scope.isSearchActive = false;

            $scope.viewTestFlag = false;
            $scope.viewFreeTestFlag = false;
            $scope.headerTestSeries = 'My Test Series';

            var testData = {};

            // $scope.buttonText = 'Start Test';
            $scope.isActive = function (viewLocation) {
                var active = (viewLocation === $location.path());
                return active;
            };

            var loadProfileData = function () {
                $scope.clientName = LoginService.getUserName();
                $scope.clientEmail = LoginService.getUserEmail();
            };

            var loadMyTestSeries = function () {
                StorefrontHttpService.getMyTestSeries().then(function (success) {
                    $('body,html').animate({
                        scrollTop: 0 // Scroll to top of body
                    }, 50);
                    $scope.myTestSeriesData = success.data;
                    $scope.loaderActivated = false;
                    $('body').removeClass('stop-scrolling');
                }, function (error) {

                    $('body,html').animate({
                        scrollTop: 0 // Scroll to top of body
                    }, 50);


                    if(error.status === 400){
                        return;
                    }

                    else{
                        setTimeout(loadMyTestSeries, 30000);

                    }

                });
            };

            $scope.purchasedTabActive = function () {
                $scope.isPracticeTest = false;
            };

            $scope.practiceTabActive = function () {
                if (!$scope.myFreeTestSeriesData)
                    loadMyFreeTestSeries();
                $scope.isPracticeTest = true;
            };

            var loadMyFreeTestSeries = function () {

                StorefrontHttpService.getMyFreeTestSeries().then(function (success) {
                    $scope.myFreeTestSeriesData = success.data;

                }, function (error) {
                });
            };

            $scope.$watch('selectedItem', function () {

                if ($scope.selectedItem && ($scope.selectedItem.title === $scope.searchText)) {
                    var currentItem = $scope.selectedItem;
                    $scope.isSearchActive = true;
                    $scope.headerTestSeries = $scope.isSearchActive ? "Search Results for '" + currentItem.title + "' " : 'My Test Series';

                    //for selecting autocomplete results and populating data
                    var selectedItemDTO = {
                        mappingId: currentItem.id,
                        packageid: currentItem.packageId
                    };

                    StorefrontHttpService.getSpecificTest(selectedItemDTO).then(function (successCallback) {
                        $scope.searchResults = successCallback.data.testInfo;
                        $scope.selectedFilter = 'All Tests';
                        //testDetails = $scope.detailedFreeTestData;
                        for (var i = $scope.searchResults.length - 1; i >= 0; i--) {
                            fillTestStatus($scope.searchResults[i]);

                        }

                    }, function (errorCallback) {

                    });

                }

            });

            $scope.autocomplete = function (searchText) {
                return StorefrontHttpService.getAutocompleteResults(searchText, null).then(function (response) {
                    return response.data.tests;
                })
            };

            $scope.filterList = ['All Tests', 'Completed', 'Incomplete', 'Not Started'];
            var sendSelectedFilter = null;

            // $scope.getSelectedFilter = function () {
            //     if ($scope.selectedFilter) {
            //
            //         if ($scope.selectedFilter === 'Completed') {
            //             sendSelectedFilter = 'COMPLETED';
            //         } else if ($scope.selectedFilter === 'Incomplete') {
            //             sendSelectedFilter = 'INCOMPLETE';
            //         } else if ($scope.selectedFilter === 'Not Started') {
            //             sendSelectedFilter = 'NOT_STARTED';
            //         } else {
            //             sendSelectedFilter = null;
            //
            //         }
            //         $scope.searchForTests($scope.searchText, sendSelectedFilter);
            //         return $scope.selectedFilter;
            //     } else {
            //         return "All Tests";
            //     }
            //     return;
            // };

            // $scope.searchForTests = function (searchTerm, filterStatus) {
            //     if (filterStatus === null) {
            //         $scope.selectedFilter = 'All Tests';
            //     }
            //
            //
            //     $scope.isSearchActive = true;
            //     $scope.loaderActivated = true;
            //     $scope.headerTestSeries = $scope.isSearchActive ? "Search Results for '" + searchTerm + "' " : 'My Test Series';
            //     var searchDTO = {
            //         searchTerm: searchTerm,
            //         filterStatus: filterStatus,
            //         currentPackageId: null
            //     };
            //     StorefrontHttpService.getTestsBySearch(searchDTO).then(function (successCallback) {
            //         $scope.searchResults = successCallback.data.testInfo;
            //         //testDetails = $scope.detailedFreeTestData;
            //         for (var i = $scope.searchResults.length - 1; i >= 0; i--) {
            //             fillTestStatus($scope.searchResults[i]);
            //         }
            //         $scope.loaderActivated = false;
            //
            //     }, function (errorCallback) {
            //         $scope.loaderActivated = false;
            //
            //     });
            // }
            //event listerner to capture enter key pressed in input field
            // document.getElementById('autocomplete-input').onkeyup = function (e) {
            //
            //     if (!e) e = window.event;
            //     var keyCode = e.keyCode || e.which;
            //     // if ($scope.searchText.length >= 3 && keyCode !== '13') {
            //     //     $scope.autocomplete($scope.searchText);
            //     // }
            //     if (keyCode == '13') {
            //         var eAcInput = this.getElementsByTagName('input')[0];
            //         eAcInput.blur();
            //         var autoChild = document.getElementById('autocomplete-input').firstElementChild;
            //         var el = angular.element(autoChild);
            //         el.scope().$mdAutocompleteCtrl.hidden = true;
            //         $scope.searchForTests($scope.searchText, sendSelectedFilter);
            //         // $(".md-virtual-repeat-container").hide();
            //         return true;
            //     }
            // };


            $scope.viewMyTests = function (selectedId) {
                $state.go('tests', {
                    pkgId: selectedId
                });

            };

            $scope.goBackToMyTests = function () {
                $scope.searchText = '';
                $scope.selectedFilter = 'All Tests';
                sendSelectedFilter = null;
                $scope.isSearchActive = false;
                $state.go('myTestSeries');
                $scope.headerTestSeries = 'My Test Series';
            };

            function saveTestData() {
                TestSeriesPortalService.setTestData(testData);
            }


            // $scope.startTest = function (testId, packageId, testTitle, resumeState) {
            //     $rootScope.blur = true;
            //     if (resumeState === 'resume' || resumeState === 'new') {
            //         saveTestData();
            //         var url = $state.href('testSeriesPortal', {
            //             id: testId,
            //             testTitle: testTitle,
            //             packageId: packageId,
            //             testStatus: resumeState
            //             //   testLanguage: lang
            //         });
            //         $window.open(url, '_blank', 'height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=yes');
            //     } else {
            //         var testAnalysisPage = $state.href('myTestAnalysis', {
            //             testName: testTitle,
            //             mappingId: testId,
            //             packageId: packageId
            //         });
            //         $window.open(testAnalysisPage, '_blank');
            //     }
            // };

            function clearPreviousTestInstruction() {
                var clearInstruction = TestSeriesPortalService.clearTestLang();
            }

            function isLoggedIn() {
                login = LoginService.isLoggedIn();
                if (!login) {
                    $state.go('home');
                    return false;
                } else {
                    $scope.loaderActivated = $rootScope.online;
                    if ($scope.loaderActivated) {
                        $('body').addClass('stop-scrolling');

                    }

                    //loadMyFreeTestSeries();
                    loadProfileData();
                    loadMyTestSeries();
                    clearPreviousTestInstruction();
                }
            }

            function reloadPage() {
                $window.location.reload();
            }

            var fillTestStatus = function (testObj) {
                if (testObj.status === 'INCOMPLETE') {
                    testObj.buttonText = 'Resume Test';
                    testObj.resumeState = 'resume';
                } else if (testObj.status === 'NOT_STARTED') {
                    testObj.buttonText = 'Start Test';
                    testObj.resumeState = 'new';
                } else {
                    testObj.buttonText = 'View Result';
                    testObj.resumeState = 'end';
                }
            }

            init = function () {
                isLoggedIn();
                $anchorScroll();
            };

            init();

        }
    ]);
