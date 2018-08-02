app = angular.module('hunters',[
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'angular-meteor',
    'ui.bootstrap',
    'ui.router',
    'ngStorage',
    'ngTouch',
    'angularUtils.directives.dirPagination',
    'vr.directives.slider',
    'ngStore',
    'ui.utils',
    'ngImgCrop',
    'mgcrea.ngStrap',
    'ui.jp',
    'oc.lazyLoad',
    'translateApp',
    //meteor package
    'ngFileUpload'

    //The version of angular must be compatible with angular-ui-bootstrap otherwise the ngAnimate will break the mdoal
    //'ngAnimate',
]);

function onReady() {
    angular.bootstrap(document, ['hunters']);
}

if (Meteor.isCordova)
    angular.element(document).on("deviceready", onReady);
else
    angular.element(document).ready(onReady);