Meteor.publish('users',function(search,options,user,searchString){
    var userId = user?user:this.userId;
    console.log("users");
    console.log(search);
    var selector ={
           'roles.basic':'recruiter'
    }
    if(search){
        if(search.onlyMy){
            var currentUser = Meteor.users.findOne(userId)||Meteor.users.findOne(user);
            if(currentUser.recruiters && currentUser.recruiters.length>0){
                selector={
                    '_id':{$in:currentUser.recruiters}
                };
            }
        }
        if(search.comapny){
            _.extend(selector,{
                'profile.company':search.company
            });
        }
        if(_.isArray(search.fields)&&search.fields.length>0){
            _.extend(selector,{
                'profile.fields':{$in:search.fields}
            });
        }
        if(search.city){
            _.extend(selector,{
                'profile.city':search.city
            });
        }
    }
    Counts.publish(this, 'usersNumber', Meteor.users.find(selector),
        { noReady: true });
    return Meteor.users.find(selector,options);
});