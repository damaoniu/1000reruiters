Meteor.publishComposite('dashboardPositions',function(search,options){
    var currentRecruiterId = this.userId;
    var selector = {
            $or:[
                {"owner":currentRecruiterId},
                {"recruiters":currentRecruiterId}
            ]
        };
    console.log('positions.search'+search);
    if(search&&search.recruiters){
        selector.$or.push({"recruiters":{$in:search.recruiters}});
    }
    Counts.publish(this, 'recruiterPositionsNumber',Positions.find(selector, { noReady: true }));
   return{
       find:function(){
           return Positions.find(selector,options)
       },
       children:[
           {
               collectionName:"positionRecruiters",
               find:function(position){
                   if(position.recruiters && position.recruiters.length>1){
                       return Meteor.users.find({
                           _id:position.recruiters._id
                       },{
                           limit:1,
                           fileds:{
                               _id:1,
                               roles:1,
                               profile:1
                           }
                       })
                   }
               },
               children:[
                   {
                       collectionName:'recruiterPositions',
                       find:function(recruiter){
                           if(recruiter){
                               return Positions.find(_id,recruiter._id);
                           }
                       }
                   }
               ]
           }
       ]
   }
});