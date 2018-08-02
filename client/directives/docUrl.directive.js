angular.module('hunters')
    .directive('docUrl',docUrlDirective)
    .directive('imgUrl',imgUrlDirective);
    docUrlDirective.$inject=['collectionFsService'];
   function docUrlDirective(collectionFsService){
       return {
           restrict:'A',
           scope:{
               doc:"="
           },
           link:function(scope,element,attrs){
               scope.url="";
               if(scope.doc){
                   scope.url=collectionFsService.getDocUrl(scope.doc._id);
               }
               scope.$watch('doc',function(n,o){
                    scope.url=collectionFsService.getDocUrl(n._id);
               });
           }
       }
   }
    imgUrlDirective.$inject=['collectionFsService'];
   function imgUrlDirective(collectionFsService){
       return {
           restrict:'A',
           scope:{
               imgUrl:"="
           },
           link:function(scope,element,attrs){
               scope.url="//:0";
               if(scope.imgUrl){
                   scope.url=collectionFsService.getImageUrl(scope.imgUrl);
               }
               scope.$watch('imgUrl',function(n,o){
                    scope.url=collectionFsService.getImageUrl(n);
                   console.log(scope.url);
               });
           }
       }
   }