angular.module("translateApp")
    .filter('translate',translateFilter);

//the filter is stateful
translateFilter.$inject=['i18nService']
function translateFilter(i18nService){
     function translate(key){
       // the method is tow _ _ combined
       return i18nService.get(key);
    }
    translate.$stateful=true;
    return translate;
}