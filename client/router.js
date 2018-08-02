/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
    'use strict';

      app.run(runBlock)
      .config(config);

      runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
      function runBlock($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }

      config.$inject =  ['$stateProvider', '$urlRouterProvider','$locationProvider','MODULE_CONFIG'];
      function config( $stateProvider,   $urlRouterProvider ,$locationProvider,MODULE_CONFIG) {
        //  turn on the html routing mode
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'client/basic/home.html',
                resolve:{
                }
            })
            .state('search',{
                url:'/search',
                templateUrl:'client/basic/search.html'

            })
            .state('signin',{
                url:'/signin',
                templateUrl:'client/basic/access/signin.html',
                controller:'SigninCtrl',
                controllerAs:'siCt'
            })
            .state('signup',{
                url:'/signup',
                templateUrl:'client/basic/access/signup.html',
                controller:'SignupCtrl',
                controllerAs:'suCt'
            })
            .state('forgotPass',{
                url:'/forgot-password',
                templateUrl:'client/basic/access/forgot-password.html',
                controller:'ForgotPassCtrl'

            })
            .state('resetPass',{
                url:"/reset-password",
                templateUrl:'client/basic/access/reset-password.html',
                controller:'ResetPassCtrl',
                controllerAs:'rpCt'
            })
            /* dashboard related routes*/
            .state('dashboard',{
                url:'/dashboard',
                abstract:true,
                templateUrl:'client/dashboard/base.html',
                controller:'DashboardCtrl',
                controllerAs:'dbct',
                data:{
                    requireLogin:true
                },
                resolve:load(['ui.select','scripts/controllers/select.js'])
            }).
            state('dashboard.main',{
                url:'',
                templateUrl:'client/dashboard/dashboard.html',
                resolve:load('scripts/controllers/chart.js')
            })
            .state("dashboard.recruiters",{
                url:"/recruiters",
                templateUrl:'client/dashboard/recruiters/recruiters.html',
                controller:'RecruitersCtrl',
                controllerAs:'resCt',
                resolve: {
                    chart:load('scripts/controllers/chart.js').deps,
                    subs:function(){
                    }
                }
            })
            .state("dashboard.positions",{
                url:"/positions",
                templateUrl:"client/dashboard/positions/positions.html",
                controller:'PositionsCtrl',
                controllerAs:'psCt',
                resolve:{
                    summernoter:load('summernote').deps,
                    momentjs:function(){
                        if(typeof moment=="undefined"){
                            return load('moment').deps;
                        }
                    }
                }
            }).
            state("dashboard.position",{
                url:"/position/:positionId",
                templateUrl:"client/dashboard/positions/position.html",
                controller:'PositionCtrl',
                controllerAs:'poCt',
                resolve:{
                    deps: load(['summernote']).deps,
                    subs:function(){
                        subsManger.subscribe('dashboardPositions');
                    }
                }
            })
            .state('dashboard.offers',{
                url:'/offers',
                templateUrl:'client/dashboard/offers/offers.html',
                controller:'OffersCtrl',
                controllerAs:'osCt'

            })
            .state("dashboard.profile",{
                url:'/profile',
                templateUrl:'client/dashboard/profile/profile.html',
                controller:'ProfileCtrl',
                controllerAs:'prCt',
                resolve:load(['ui.select','scripts/controllers/select.js'])
            })
            .state("dashboard.availability",{
                url:"/availability",
                templateUrl:'client/dashboard/availability/availability.html',
                controller:'AvailabilityCtrl',
                controllerAs:'avCt',
                resolve: load(['moment','fullcalendar','ui.calendar','scripts/controllers/angularstrap.js'])
            })
            .state("dashboard.candidates",{
                url:'/candidates',
                templateUrl:'client/dashboard/candidates/candidates.html',
                controller:'CandidatesCtrl',
                controllerAs:'caCt',
                data:{
                    role:'recruiter'
                },
                resolve: load(['scripts/controllers/chart.js','ui.select'])
            })
            .state('logout', {
                url: '/logout',
                resolve: {
                    "logout": [ '$state', function( $state) {
                        return Meteor.logout(function(err){
                            if(err){
                                console.log('logout error - ', err);
                            }else{
                                $state.go('home');
                            }
                        });
                    }]
                }
            });
            ;

          function load(srcs, callback) {
              return {
                  deps: ['$ocLazyLoad', '$q',
                      function( $ocLazyLoad, $q ){
                          var deferred = $q.defer();
                          var promise  = false;
                          srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                          if(!promise){
                              promise = deferred.promise;
                          }
                          angular.forEach(srcs, function(src) {
                              promise = promise.then( function(){
                                  angular.forEach(MODULE_CONFIG, function(module) {
                                      if( module.name == src){
                                          src = module.module ? module.name : module.files;
                                      }
                                  });
                                  return $ocLazyLoad.load(src);
                              } );
                          });
                          deferred.resolve();
                          return callback ? promise.then(function(){ return callback(); }) : promise;
                      }]
              }
          }

          function getParams(name) {
              name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
              var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                  results = regex.exec(location.search);
              return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
          }
      }

