app.config(appConfigor);
 appConfigor.$inject =['$alertProvider','paginationTemplateProvider'];
 function appConfigor($alertProvider,paginationTemplateProvider){
         angular.extend($alertProvider.defaults, {
             animation: 'am-fade-and-slide-top',
             placement: 'top',
             templateUrl:'client/views/blocks/tpl.alert.html',
             show:true,
             type:'info',
             duration:3
         });

 //    pagination
     paginationTemplateProvider.setPath('client/views/templates/paginationTemplate.html');

 }