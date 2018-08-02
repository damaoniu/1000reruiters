angular.module('translateApp')
    .directive('languageSelect',languageSelectDirective);
    languageSelectDirective.$inject=['i18nService'];
    function languageSelectDirective(i18nService){
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            template:'<ul class="nav navbar-nav navbar-right">' +
            '<li class="dropdown"> ' +
            '<a data-toggle="dropdown" class="dropdown-toggle font_pink">{{"language"|translate}}</b></a> ' +
            '<ul class="dropdown-menu"> ' +
            '<li ng-class="{tab_active:isSelected(l.key)}" ng-repeat="l in languages" ng-click="changeLanguage(l.key)"><a class="font_pink">{{l.name}}</a></li> ' +
            '</ul> </li> </ul>',
            controller: translateLanguageSelectController
        };
    }

translateLanguageSelectController.$inject=['$scope','i18nService',"$cookies"];
function translateLanguageSelectController($scope,i18nService,$cookies){
    $scope.languages = i18nService.getLanguageNames();
    $scope.isSelected=function(key){
        return key ===$cookies.get('language');
    }
    $scope.changeLanguage = function (language) {
        i18nService.set(language)
    };

}