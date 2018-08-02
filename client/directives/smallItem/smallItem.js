angular.module('hunters')
       .directive('smallItem',smallItemDir);
       smallItemDir.$inject=[];
       function smallItemDir(){
           return {
               restrict:'E',
               scope:{
                   model:'=',
                   template:"@",
                   object:"="
               },
               //template:"<div ui-include=\"'{{template}}'\"></div>",
               templateUrl:'client/directives/smallItem/smallItem.html',
               controller:'SmallItemCtrl',
               link:function(scope,element,attrs){

               }

           }
       }