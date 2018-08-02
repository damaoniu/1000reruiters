angular.module('hunters')
    .controller('CandidatesCtrl',canCtrl);
    canCtrl.$inject=['$scope','$reactive'];
    function canCtrl($scope,$reactive){
        $reactive(this).attach($scope);
        var vm = this;
        vm.search = {
            skills:[],
            city:'montreal'
        };
        vm.getMyCandidates=getMyCandidates;
        vm.getCandidatesByPosition = getCandidatesByPosition;
        vm.myCandidates=false;
        vm.position=false;
        vm.page =1;
        vm.perPage=10;
        vm.searchChanged =false;




        function getMyCandidates(){
                vm.search.recruiters=vm.onlyMy?[Meteor.userId()]:null;
        }
        function getCandidatesByPosition(positionId){
            vm.search.positions=[positionId];
        }
        vm.helpers({
            candidates:function(){
                return Meteor.users.find({_id:{$ne:Meteor.userId()}},{
                        sort:{}
                    }
                );
            },
            candidatesCount:function(){
                //to make it reactive always use a function to return
                return Counts.get('candidatesCount');
            },
            candidatesPositionsCount:function(){
                return Counts.get('candidatesPositionsCount');
            },
            myPositions:function(){
                return Positions.find({},{
                    sort:{
                        updatedAt:-1
                    }
                });
            }

        });

        //vm.subscribe('candidates',function(){
        //       return [
        //           {
        //               //have to specified until the last specification like search.city
        //               city:vm.getReactively('search.city'),
        //               skills:vm.getReactively('search.skills'),
        //               recruiters:vm.getReactively('search.recruiters'),
        //               positions:vm.getReactively('search.positions')
        //           },
        //           {
        //               limit:parseInt(vm.getReactively('perPage')),
        //               skip: (parseInt(vm.getReactively('page')) - 1) * parseInt(vm.getReactively('perPage')),
        //               sort:{}
        //
        //           }
        //       ];
        //   });
        /*the subscribe is changed to autorun in favor of using the subsmanager*/
        vm.subscribe('dashboardPositions',function(){

        });
        var CandidatessSub = new SubsManager();
        vm.autorun(function(){

            //in this way we can use the subsmanager functionatility check if the search is changing
            if(vm.searchChanged){
                CandidatessSub.clear();

            }
            CandidatessSub.subscribe('candidates',{
                    //have to specified until the last specification like search.city
                    city:vm.getReactively('search.city'),
                    skills:vm.getReactively('search.skills'),
                    recruiters:vm.getReactively('search.recruiters'),
                    positions:vm.getReactively('search.positions')
                },
                {
                    limit:parseInt(vm.getReactively('perPage')),
                    skip: (parseInt(vm.getReactively('page')) - 1) * parseInt(vm.getReactively('perPage')),
                    sort:{}

                });


        });

        vm.candidateChosen = this.candidates[0];

       $scope.$on('$destroy',function(){
          vm.stop();
       });
       //$scope can still watch the vm
        $scope.$watchCollection ('vm.search',function(n,o){
            vm.searchChanged=true;
        });
    }