angular.module('common.directives.autocompleteDirective', [])


.directive('autocomplete', ['$sce', 'handlerService', '$document', '$state',
    function($sce, handlerService, $document, $state) {
        return {
            restrict: 'A',
            scope: {
                "selectedObject": "=",
                "minLength": "@",
                "maxLength": "=",
                "getData": "=",
                "onSelect": "=",
                "onCancel": "&?",
                "enterHandler": "&",
                "searchStr": "=searchTerm",
                "searchTermError": "=?",
                "placeholder": "@"
            },
            templateUrl: $sce.trustAsResourceUrl(autocomplete),
            link: link
        };

        function link(scope, elem, attrs) {
            var minLength = scope.minLength ? parseInt(scope.minLength, 10) : 5,
                inputField = elem.find('input'),
                maxLength = scope.maxLength ? parseInt(scope.maxLength, 10) : 50;

            scope.currentIndex = null;
            scope.searchObjectKey = null;

            scope.clearSearchTerm = clearSearchTerm;

            function isNewSearchNeeded(term) {
                return term.length >= minLength && term.length <= maxLength;
            }

            function processResults(responseData, key) {
                var text = "",
                    re = null,
                    strPart = "",
                    str = scope.searchStr;

                if (key) {
                    scope.searchObjectKey = key;
                } else {
                    scope.searchObjectKey = null;
                }

                scope.results = [];
                if (responseData && responseData.length > 0) {
                    for (var i = 0; i < responseData.length; i++) {
                        re = new RegExp(str, 'i');

                        text = key ? responseData[i][key] : responseData[i];

                        strPart = text.match(re) ? text.match(re)[0] : "";
                        text = $sce.trustAsHtml(text.replace(re, '<span class="selected">' + strPart + '</span>'));

                        scope.results.push({
                            displayHtml: text,
                            data: responseData[i]
                        });
                    }
                }
            }

            function onKeyUp(event) {
                if (!(event.which === 38 || event.which === 40 || event.which === 13 || event.which === 27)) {
                    scope.currentIndex = -1;

                    if (!scope.searchStr || scope.searchStr === "") {
                        scope.results = [];
                    } else if (isNewSearchNeeded(scope.searchStr)) {
                        onKeyPress(scope.searchStr);
                    }
                } else {
                    event.preventDefault();
                }
            }

            function onKeyPress(str) {
                // Begin the search
                scope.searchTermError = false;
                if (str.length >= minLength) {
                    scope.getData(str, processResults);
                }
            }

            function clearSearchTerm() {
                scope.searchStr = "";
                scope.results = [];
                scope.searchTermError = false;
                scope.onCancel();
            }

            scope.hoverRow = function(index) {
                scope.currentIndex = index;
            };

            scope.selectResult = function(result) {
                scope.searchStr = scope.searchObjectKey ? result.data[scope.searchObjectKey] : result.data;
                scope.selectedObject = result.data;
                scope.results = [];
                if (scope.onSelect && typeof scope.onSelect === "function") {
                    scope.onSelect(scope.selectedObject);
                }
            };



            inputField.on('keyup', onKeyUp);

            elem.on("keyup", function(event) {
                var suggestionRow = elem.find('ul.autocomplete-dropdown')[0],
                    selectedRow = elem.find('li.autocomplete-selected-row'),
                    heightOffset = selectedRow.height();
                scope.autoCompleteError = '';
                if (event.which === 40) { //down arrow
                    if (scope.results && (scope.currentIndex + 1) < scope.results.length) {
                        scope.currentIndex++;
                        scope.searchStr = scope.results[scope.currentIndex].data[scope.searchObjectKey];
                        suggestionRow.scrollTop = (selectedRow.index() + 1) * heightOffset;
                        scope.$apply();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    scope.$apply();
                } else if (event.which === 38) { //up arrow
                    if (scope.currentIndex >= 1) {
                        scope.currentIndex--;
                        scope.searchStr = scope.results[scope.currentIndex].data[scope.searchObjectKey];
                        suggestionRow.scrollTop = (selectedRow.index() - 1) * heightOffset;
                        scope.$apply();
                        event.preventDefault();
                        event.stopPropagation();
                    }

                } else if (event.which === 13) { //enter

                    if (scope.results && scope.currentIndex >= 0 && scope.currentIndex < scope.results.length) {
                        scope.selectResult(scope.results[scope.currentIndex]);
                        scope.$apply();
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        scope.results = [];
                        if (scope.searchStr.length >= minLength && scope.searchStr.length <= maxLength && scope.enterHandler && typeof scope.enterHandler === "function") {
                            scope.enterHandler({
                                "searchStr": scope.searchStr
                            });
                        } else if (scope.searchStr.length < minLength) {
                            scope.searchTermError = "Please enter " + minLength + " or more characters for search ";
                        } else if (scope.searchStr.length > maxLength)
                            scope.searchTermError = "Search exceeds maximum length of " + maxLength;
                        scope.$apply();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                } else if (event.which === 27) { //escape 
                    scope.results = [];
                    scope.$apply();
                    event.preventDefault();
                    event.stopPropagation();
                } else if (event.which === 8) { //backspace
                    scope.selectedObject = null;
                    scope.$apply();
                    event.preventDefault();
                    event.stopPropagation();
                }
            });

            $document.off('click.autocomplete-directive').on('click.autocomplete-directive', function(event) {
                if (angular.element(event.target).closest(elem).length === 0) {
                    scope.results = [];
                    scope.$apply();
                }
            });
        }
    }
]);
