angular.module('hunters')
    .filter('mongoDate',[function(){
    return function(date,format){
        format =format||"YY/MM/DD";
        return moment(date).format(format);
    };
}])
    .filter('without',[function(){
    return function(array,item){
        return _.without(array,item);
    }
}]);