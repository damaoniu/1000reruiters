angular.module('hunters')
    .controller('DashboardCtrl',dashboardController);
    dashboardController.$inject=['$scope','$meteor'];
    function dashboardController($scope,$meteor){
        var vm = $scope;
        vm.recentFollowers = [
            {
                name:"lala",
                icon:'assets/images/a2.jpg',
                status:'online'

            },
            {
                name:"aha",
                icon:'assets/images/a4.jpg',
                status:'offline'

            },
            {
                name:"goo",
                icon:'assets/images/a5.jpg',
                status:'away'

            }
        ];
        vm.feeds =[
            {
                author:{
                    name:'aa',
                    icon:'assets/images/a3.jpg'
                },
                time:'Sat, 5 Mar,2015',
                content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante soe aiea ose dos soois.</p> <small>Someone famous in <cite title='Source Title'>Source Title</cite></small>",
                replies:[
                    {
                        author:{
                            name:'good',
                            icon:"assets/images/a2.jpg"
                        },
                        time:'Sat, 5 Mar,2015',
                        content:"<p><a href class='text-info'>Jessi</a> assign you a task <a href class='text-info'>Mockup Design</a>.</p>"
                    }
                ]
            }
        ];
        vm.suggestedConnect ={
            icon:"assets/images/a1.jpg",
            name:'hullaa',
            positionsNumber:45,
            place:'Montreal, CA',
            link:'http://goodman.com'

        }

    }