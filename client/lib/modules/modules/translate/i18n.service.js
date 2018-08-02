angular.module('translateApp')
    .service('i18nService',i18nServiceFacotry);

    i18nServiceFacotry.$inject=['$cookies',"$rootScope","Languages"];
    function i18nServiceFacotry($cookies,$rootScope,Languages){
        return {
            get:function(key){
                // this TAPi18n.__ is reactive
                return TAPi18n.__(key);
            },
            set:function(language){
                TAPi18n.setLanguage(language).done(function(){
                    $cookies.put('language',language)
                });

            },
            getLanguageNames:function(){
                return Languages;
            }

        }
    }
