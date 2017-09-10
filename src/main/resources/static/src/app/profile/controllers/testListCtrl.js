angular.module('profile.controllers.testListCtrl', [])
    .controller('testListCtrl', ['$scope', '$location', '$anchorScroll', 'anchorSmoothScroll', '$http', '$state',
        'StorefrontHttpService', 'LoginService', '$window', 'TestSeriesPortalService', '$rootScope', '$stateParams', '$sce', '$mdMedia', '$mdDialog', 'paginationService',
        function($scope, $location, $anchorScroll, anchorSmoothScroll, $http, $state, StorefrontHttpService,
            LoginService, $window, TestSeriesPortalService, $rootScope, $stateParams, $sce, $mdMedia, $mdDialog, paginationService) {

            //      $scope.Math = Math;
            // var testDetails;
            $rootScope.blur = false;
            $scope.searchText = '';
            $scope.pageIndex = 0;

            var currentPackageId = '';

            $scope.DEFAULT_ALL_TEST_SERIES_GROUP_NAME = '-- All Test--';

            $scope.ALL_TEST = 'All Tests';

            $scope.pageSize = 20;
            //Current page
            $scope.pageEnd;
            $scope.isSearchActive = false;

            $scope.viewTestFlag = true;
            $scope.viewFreeTestFlag = false;

            $scope.detailedTestDataComplete = []; //Contains Complete list
            $scope.detailedTestDataGroupWise = []; //{groupName,list}

            $scope.groupNameList = [];

            $scope.selectedGroup = $scope.DEFAULT_ALL_TEST_SERIES_GROUP_NAME;
            var testData = {};
            var currentPackageId = $stateParams.pkgId;


            $(window).on("blur focus", function(e) {
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
            })

            var loadInstructionData = function() {
                var currentPackageId = $stateParams.pkgId;
                StorefrontHttpService.getPackagesById(currentPackageId)
                    .then(function(data) {
                        $scope.details = data.data;
                        $rootScope.instructions = $sce.trustAsHtml($scope.details.description);
                    }, function(error) {

                        //do something
                    });

            };

            $scope.$watch('pagination.current', function(val) {

                $scope.pageChangeHandler(val);
            });

            // md-modal for description
            $scope.showPrerenderedDialog = function(ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'profile/views/testSeriesDescription.tpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    fullscreen: useFullScreen,
                    clickOutsideToClose: true
                });
            }


            function DialogController($scope, $mdDialog, $rootScope) {
                $scope.instructionsData = $rootScope.instructions;
                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }




            $scope.$watch('selectedItem', function() {

                if ($scope.selectedItem && ($scope.selectedItem.title === $scope.searchText)) {
                    var currentItem = $scope.selectedItem;
                    $scope.isSearchActive = true;
                    $scope.headerTestSeries = $scope.isSearchActive ? "Search Results for '" + currentItem.title + "' " : 'My Test Series';

                    //for selecting autocomplete results and populating data
                    var selectedItemDTO = {
                        mappingId: currentItem.id,
                        packageid: currentItem.packageId
                    };

                    StorefrontHttpService.getSpecificTest(selectedItemDTO).then(function(successCallback) {

                        $scope.selectedFilter = $scope.ALL_TEST;
                        onDownloadDetailedData(successCallback.data.testInfo, true);

                    }, function(errorCallback) {

                    });

                }

            });

            $rootScope.$watch('crossed', function() {
                //  var a = $rootScope.crossed;

                if ($rootScope.crossed !== undefined) {
                    $scope.goBackNoResult();
                }
            });


            $scope.autocomplete = function(searchText) {
                return StorefrontHttpService.getAutocompleteResults(searchText, currentPackageId).then(function(response) {
                    return response.data.tests;
                })
            }

            $scope.filterList = [$scope.ALL_TEST, 'Completed', 'Incomplete', 'Not Started'];
            $scope.selectedFilter = $scope.ALL_TEST;
            var sendSelectedFilter = null;
            $scope.getSelectedFilter = function() {
                $scope.pageIndex = 0;
                if ($scope.selectedFilter !== undefined) {
                    if ($scope.selectedFilter === 'Completed') {
                        sendSelectedFilter = 'COMPLETED';
                    } else if ($scope.selectedFilter === 'Incomplete') {
                        sendSelectedFilter = 'INCOMPLETE';
                    } else if ($scope.selectedFilter === 'Not Started') {
                        sendSelectedFilter = 'NOT_STARTED';
                    } else {
                        sendSelectedFilter = null;
                    }
                    if ($scope.searchText) {
                        $scope.searchForTests($scope.searchText, sendSelectedFilter);

                    } else {
                        $scope.viewMyTests();
                    }
                    return $scope.selectedFilter;
                } else {
                    return $scope.ALL_TEST;
                }
            };



            $scope.searchForTests = function(searchTerm, filterStatus) {
                //$scope.pageSize = 0;
                $scope.query = searchTerm;
                $scope.isSearchActive = true;
                $scope.headerTestSeries = $scope.isSearchActive ? "Search Results for '" + searchTerm + "' " : 'My Test Series';
                var searchDTO = {
                    searchTerm: searchTerm,
                    filterStatus: filterStatus,
                    currentPackageId: currentPackageId
                };
                StorefrontHttpService.getTestsBySearch(searchDTO).then(function(successCallback) {

                    onDownloadDetailedData(successCallback.data.testInfo, true);

                }, function(errorCallback) {

                });
            }

            document.getElementById('autocomplete-input').onkeypress = function(e) {
                if (!e) e = window.event;
                var keyCode = e.keyCode || e.which;

                if (keyCode == '13' && $scope.searchText) {

                    $scope.selectedFilter = $scope.ALL_TEST;
                    $scope.getSelectedFilter();

                    var eAcInput = this.getElementsByTagName('input')[0];
                    eAcInput.blur();

                    var autoChild = document.getElementById('autocomplete-input').firstElementChild;
                    var el = angular.element(autoChild);
                    el.scope().$mdAutocompleteCtrl.hidden = true;
                    $scope.searchForTests($scope.searchText, sendSelectedFilter);

                    // Enter pressed
                    return true;
                }
            }



            // $scope.buttonText = 'Start Test';
            $scope.isActive = function(viewLocation) {
                var active = (viewLocation === $location.path());
                return active;
            };

            var loadProfileData = function() {
                $scope.clientName = LoginService.getUserName();
                $scope.clientEmail = LoginService.getUserEmail();
            };

            $scope.pageChangeHandler = function(pageNumber) {
                setCurrentPage(pageNumber);
                $("#idMyTestListMdContent").animate({
                    scrollTop: 0 // Scroll to top of body
                }, 50);
                $anchorScroll();
            };


            $scope.onGroupClick = function(groupName) {
                paginationService.setCurrentPage('__default', 1);
                $scope.selectedGroup = groupName;
                $scope.pageChangeHandler(1);

            };
            var setCurrentPage = function(pageNumber) {
                $scope.pageIndex = pageNumber - 1;
                // $("#insidePkg").animate({ scrollTop: 0 }, "fast");
                var fullList = $scope.detailedTestDataComplete;
                var dataExistForGroup = false;
                if ($scope.selectedGroup != $scope.DEFAULT_ALL_TEST_SERIES_GROUP_NAME) {
                    for (var i = 0; i < $scope.detailedTestDataGroupWise.length; i++) {

                        if ($scope.detailedTestDataGroupWise[i].groupName == $scope.selectedGroup) {
                            fullList = $scope.detailedTestDataGroupWise[i].list;
                            dataExistForGroup = true;
                            break;
                        }
                    }
                    if (dataExistForGroup == false) {
                        $scope.detailedTestData = [];
                        return;
                    }
                }


                $scope.totalCount = fullList.length;
                $scope.pageStart = ($scope.pageIndex * $scope.pageSize) + 1;
                $scope.pageEnd = $scope.pageStart + Math.min($scope.pageSize, $scope.totalCount - $scope.pageStart + 1) - 1;


                var total = fullList.length;


                var pageSize = $scope.pageSize;
                var startIndex = $scope.pageIndex * pageSize;
                var endIndex = startIndex + pageSize;
                if (endIndex > total) {
                    endIndex = total;
                }
                var detailedTestDataTemp = [];
                for (var i = startIndex; i < endIndex; i++) {
                    detailedTestDataTemp.push(fullList[i]);
                }
                $scope.detailedTestData = detailedTestDataTemp;

                for (var i = 0; i < $scope.detailedTestData.length; i++) {
                    fillTestStatus($scope.detailedTestData[i]);
                }

            }

            var onDownloadDetailedData = function(testInfo, fromSearch, filter) {


                var populateGroupName = (!fromSearch && (filter == undefined || filter == null || filter == $scope.ALL_TEST));


                $scope.detailedTestDataComplete = testInfo;
                $scope.detailedTestDataGroupWise = [];

                if (populateGroupName == true) {
                    $scope.groupNameList = [];
                }
                if ($scope.detailedTestDataComplete != undefined && !$scope.detailedTestDataComplete.length == 0) {


                    for (var i = 0; i < $scope.detailedTestDataComplete.length; i++) {
                        var test = $scope.detailedTestDataComplete[i];
                        var notExist = true;
                        for (var j = 0; j < $scope.detailedTestDataGroupWise.length; j++) {
                            if ($scope.detailedTestDataGroupWise[j].groupName == test.groupName) {
                                $scope.detailedTestDataGroupWise[j].list.push(test);
                                notExist = false;
                                break;
                            }
                        }
                        if (notExist == true) {
                            $scope.detailedTestDataGroupWise.push({ "groupName": test.groupName, "list": [test] });
                            if (populateGroupName == true) {
                                $scope.groupNameList.push(test.groupName);
                            }
                        }

                    }

                }

                $scope.groupNameList.sort();
                setCurrentPage(1);


            }

            $scope.viewMyTests = function() {
                $scope.viewFreeTestFlag = false;
                $scope.viewTestFlag = true;
                $scope.loaderActivated = true;
                $scope.isSearchActive = false;
                var testDto = $scope.createTestListDTO();
                StorefrontHttpService.getTests(testDto).then(function(successCallback) {
                        $scope.packageTitle = successCallback.data.packageInfo.title
                        $scope.loaderActivated = false;

                        $('body').removeClass('stop-scrolling');
                        $('body,html').animate({
                            scrollTop: 0 // Scroll to top of body
                        }, 50);

                        $scope.headerTestSeries = successCallback.data.packageInfo.title;
                        $scope.totalCount = successCallback.data.packageInfo.count;
                        $scope.pageStart = ($scope.pageIndex * $scope.pageSize) + 1;
                        $scope.pageEnd = $scope.pageStart + Math.min($scope.pageSize, $scope.totalCount - $scope.pageStart + 1) - 1;

                        onDownloadDetailedData(successCallback.data.testInfo, false, testDto.filter);
                        loadInstructionData();

                    },
                    function(errorCallback) {

                        if (errorCallback.status === 400) {
                            return;
                        } else {
                            $('body,html').animate({
                                scrollTop: 0 // Scroll to top of body
                            }, 50);
                            $scope.loaderActivated = false;
                        }



                    });
                $anchorScroll();
            }

            $scope.createTestListDTO = function() {
                var data = {
                    pageSize: $scope.pageSize,
                    start: $scope.pageIndex,
                    id: currentPackageId,
                    filter: sendSelectedFilter || null
                };
                return data;
            };

            $scope.goBackNoResult = function() {
                $scope.searchText = '';
                $scope.selectedFilter = $scope.ALL_TEST;
                sendSelectedFilter = null;
                $scope.showMyTests();
            };
            $scope.goBackNoSearchInAllTests = function() {
                $scope.onGroupClick($scope.DEFAULT_ALL_TEST_SERIES_GROUP_NAME);

            };

            $scope.showMyTests = function() {
                $scope.isSearchActive = false;
                //reloadPage();
                $scope.viewMyTests();
            };

            $scope.goBackToMyTests = function() {

                if ($scope.isSearchActive) {
                    $scope.goBackNoResult();
                    return;
                }


                $scope.viewTestFlag = false;
                $scope.viewFreeTestFlag = false;
                $state.go('myTestSeries');
                // $scope.headerTestSeries = 'My Test Series';
            };

            // function saveTestData() {
            //     TestSeriesPortalService.setTestData(testData);
            // }


            $scope.startTest = function(testId, testTitle, resumeState) {
                $rootScope.blur = true;
                if (resumeState === 'resume' || resumeState === 'new') {
                    // saveTestData();
                    var url = $state.href('testSeriesPortal', {
                        id: testId,
                        testTitle: testTitle,
                        packageId: currentPackageId,
                        testStatus: resumeState
                            //   testLanguage: lang
                    });
                    $window.open(url, '_blank', 'height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=yes');
                } else {
                    var testAnalysisPage = $state.href('myTestAnalysis', {
                        testName: testTitle,
                        mappingId: testId,
                        packageId: currentPackageId
                    });
                    $window.open(testAnalysisPage, '_blank');
                }
            };

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
                    $scope.viewMyTests();
                    loadProfileData();
                    //clearPreviousTestInstruction();
                }
            }

            function reloadPage() {
                $window.location.reload();
            }

            var fillTestStatus = function(testObj) {

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

            init = function() {
                isLoggedIn();
                $anchorScroll();

            };

            init();

        }
    ]);
