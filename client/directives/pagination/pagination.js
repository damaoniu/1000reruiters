angular.module('hunters').directive('joePagination',["$templateRequest","$compile",function($templateRequest,$compile){
    return {
        restrict:'E',
        scope:{
            subscription:"@",
            paginationTemplate:'@',
            perPage:"@",
            collection:'=',
            placeholder:"@",
            isUser:"@"
        },
        //transclude:true,
        template:"<div>" +'<div class="input-group col-md-5">' +
        ' <input type="text" role="input" class="form-control" ng-model="search" placeholder="{{placeholder}}" /> ' +
        '<span class="input-group-addon font_pink"><i ng-show="!searching" class="fa fa-search"></i><i ng-show="searching" class="fa fa-spinner"></i></span>' +
        ' </div>'+
        "</div>",
        controller:'PaginationCtrl',
        link:{
            //this grabs various items templates and put them into the pagination div before everything loads
            pre:function(scope,element,attr){
                $templateRequest(scope.paginationTemplate).then(function(response){
                    var tpl = response,
                        $elem = $compile(tpl)(scope);
                        element.append($elem);
                });
            }
        }

    };
}]);