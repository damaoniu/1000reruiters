angular.module('hunters').
    directive('multiSelect',mulSelectDirective);
    mulSelectDirective.$inject=['$meteor','$scope'];
    function mulSelectDirective($meteor,$scope){
        return {
            restrict:'E',
            scope:{
                model:'=',
                multiple:'@',
                placeHolder:'@',
                matchTemplate:'@',
                choicesTemplate:'@',
                subscription:"@",
                isUser:'@'

            },
            templateUrl:'client/directives/multiSelect/multiSelect.html',
            controller:'MultiSelectCtrl',
            link:function(scope,element,attrs){
                scope.multiple = scope.multiple?scope.$eval(scope.multiple):false;
                if(!scope.matchTemplate){
                    console.warn('no match template');
                }
            }
        }
    }