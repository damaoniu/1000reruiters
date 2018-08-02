angular.module('ngCart')
    .directive('billingForm',billingFormDirective);
    billingFormDirective.$inject=['ngCart'];
    function billingFormDirective(ngCart){
        return {
            restrict:'E',
            templateUrl:'templates/cart/billingForm.ng.html',
            scope:{
                cart:'=',
                client:'='
            },
            controller:"BillingFormCtrl"
        };
    }