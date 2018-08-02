
/*
*
* Author Joe Zhou;
* 2015-11-25
* A seperated module provides angular framework the opportunity to take advantage of the the TAPi18n meteor package.
* This is just an angular wrapper around the meteor package
* @configurable
* The i18nService allow you to set a default language at the run phase of your meteor app
* Choice is persisted on the client browser by ngCookies
* @stateful filters
* The stateful translate filter allows you to change the language of your application without refreshing the package
*
* */
angular.module('translateApp',['ngCookies'])
    .constant("Languages",[
        {'name':"English","key":"en"},
        {"name":"French","key":"fr"}
]).run(translateRun);

translateRun.$inject=['$cookies','i18nService'];
function translateRun($cookies,i18nService){
    if($cookies.get('language')){
        i18nService.set($cookies.get('language'));
    }else{
        i18nService.set('en');
    }

}