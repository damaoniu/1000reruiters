angular.module('hunters')
    .controller('RecruitersCtrl',recuitersCtrl);
    recuitersCtrl.$inject=['$scope','$meteor','$reactive'];
    function recuitersCtrl($scope,$meteor,$reactive){
        $reactive(this).attach($scope);
        var subs = new SubsManager();
        var vm = this;
        vm.search ={
            onlyMy:true
        };
        vm.selector = {
            onlyMy:true
        }
        vm.searchRecruiters =searchRecruiters;

        vm.helpers({
           recruiters: getRecruiters
        });
        vm.autorun(function(){
               //subs.reset();
               //subs.subscribe('users',vm.getReactively('search',true));
               Meteor.subscribe('users',vm.getReactively('selector',true));
        });

        function getRecruiters(){
            return Meteor.users.find({
                'roles.basic':'recruiter'
            },{
               sort:{
                   updatedAt:-1
               }
            });
        }
        function searchRecruiters(){
            vm.selector = angular.copy(vm.search);
            console.log(vm.selector);
        }
        vm.section='list';

        vm.recruiterChosen = vm.recruiters[0];
        vm.isSection=function(section){
            return vm.section ===section;
        }
        vm.setSection=function(section){
            vm.section =section;
        }

    }