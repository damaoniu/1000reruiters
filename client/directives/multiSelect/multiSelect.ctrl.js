angular.module('hunters')
    .filter('propsFilter',propsFilter)
    .controller('MultiSelectCtrl',multiSelectCtrl);
    multiSelectCtrl.$inject=['$meteor','$scope','$window','$reactive'];
    function propsFilter() {
        return filter;
        function filter(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }
            return out;
        };
    }

    function multiSelectCtrl($meteor,$scope,$window,$reactive){
        var vm =$scope;
         var reactiveContext = $reactive(this);
        vm.refresh  = refresh;
        vm.perPage=vm.perPage||10;
        vm.page=1;
        reactiveContext.subscribe(vm.subscription,function(){
            return [
                {
                    limit: parseInt(vm.perPage),
                    skip: (parseInt(vm.page - 1) * parseInt(vm.perPage)),
                    sort: {
                        updatedAt: -1
                    }
                },
                vm.vm.$parent.currentUser._id,
                vm.input
            ];
        });
        reactiveContext.helpers({
            items:function(){
                var collection = vm.isUser ? Meteor.users : $window[capitalizeFirst(vm.subscription)];
                var exclusion = vm.isUser ? {_id: {$ne: vm.$parent.currentUser._id}} : {};
                return collection.find(exclusion, {
                    sort: {
                        createdAt: -1
                    }
                });
            }
        });


        function refresh(input){
            vm.input = input;
        }

        vm.$on('$destroy',function(){
            //this is needed if using the controller as
            //reactiveContext.stop();
        })
        //the old way
        //$meteor.autorun(vm,function() {
        //    vm.$meteorSubscribe(vm.subscription, {
        //        limit: parseInt(vm.getReactively('perPage')),
        //        skip: (parseInt(vm.getReactively('page')) - 1) * parseInt(vm.getReactively('perPage')),
        //        sort: {
        //            updatedAt: -1
        //        }
        //    }, vm.$parent.currentUser._id, vm.getReactively('input')).then(function (servicesHandler) {
        //        vm.collection = vm.$meteorCollection(function () {
        //            //find the collection by using the $window variable
        //            var collection = vm.isUser ? Meteor.users : $window[capitalizeFirst(vm.subscription)];
        //            var exclusion = vm.isUser ? {_id: {$ne: vm.$parent.currentUser._id}} : {};
        //            return collection.find(exclusion, {
        //                sort: {
        //                    createdAt: -1
        //                }
        //            });
        //        });
        //    });
        //});
}