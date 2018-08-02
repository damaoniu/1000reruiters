angular.module('hunters')
       .controller('OffersCtrl',offersCtrl);
       offersCtrl.$inject=['$scope','$meteor'];
       function offersCtrl($scope,$meteor){
           var vm  =$scope;
           vm.section ="list";
           vm.offers=[{
               title:"Java developer",
               location:"montreal ca",
               desc:'the best job in town',
               salary:'120k/year',
               deadline:'2015-12-13',
               status:'pending',
               recruiter:{
                   name:'Jeff wochiski',
                   icon:"assets/images/a0.jpg",
                   desc:'aldkjfa asdfjla adskfjadfja',
                   fields:[
                       'java',
                       'javaScript'
                   ],

                   online:true,
                   staffed:90,
                   currentPositions:[
                       {
                           title:'java engineer',
                           shortDesc:'good postion, 100-120k'
                       },
                       {
                           title:'python engineer',
                           shortDesc:'good postion, 100-120k'
                       },
                       {
                           title:'go engineer',
                           shortDesc:'good postion, 100-120k'
                       },
                   ]

               },
               candidate:{
                   name:'Jeff aaa',
                   icon:"assets/images/a0.jpg",
                   desc:'aldkjfa asdfjla adskfjadfja'
               },
               benefits:'adfadjfaldfa' +
               ' kadjfasd lk adjf adsjkf'

           }];
           vm.offerChosen=vm.offers[0];
           //vm.positionChosen = vm.positions[0];
           vm.isSection=function(section){
               return vm.section ===section;
           }
           vm.setSection=function(section){
               vm.section =section;
           }
       }