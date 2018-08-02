angular.module('hunters')
    .controller("ProfileCtrl",profileCtrl);
    profileCtrl.$inject = ["$scope","$meteor",'$alert','$reactive','$rootScope'];
    function profileCtrl($scope,$meteor,$alert,$reactive,$rootScope){
        var vm = $scope;
        //vm.user = Meteor.user().profile;
        var reactiveContext = $reactive($scope);
        //vm.rootUser=$scope.$meteorObject(Meteor.users,$scope.currentUser._id);
        //vm.user =vm.getReactively('rootUser.profile');
        /*password*/
        vm.changePass=changePass;
        vm.saveUser = saveUser;
        reactiveContext.subscribe('files',function(){
            return [
                Meteor.userId()
            ];
        });
        reactiveContext.helpers({
           user: function(){
               return Meteor.user().profile;
           },
           files:function(){
               if(_.isArray(vm.user.docs)){
                   return Files.find({
                       _id:{$in:vm.user.docs}
                   });
               }

           }
        });

        function changePass(){
            //this is a meteor client side only function
            Accounts.changePassword(vm.pass.passOld,vm.pass.passNew,function(err){
                if(err){
                    $alert({
                        title: TAPi18n.__('app.passnotmatch'),
                        type:'danger'
                    });
                }else{
                    $alert({
                        title: TAPi18n.__('app.passchangeSucess'),
                        type:'success'
                    });
                }
            });

        }
        function saveUser(){
            var alert = $alert({
                title:TAPi18n.__('savinguser'),
                template:'<span class="text-lg fa fa-spinner"></span>',
                type:'info'
            });
            $meteor.call('saveUser',angular.toJson({
                _id:vm.currentUser._id,
                profile:vm.user
            })).then(
                function(res){
                },
                function(err){
                });
        }
    }