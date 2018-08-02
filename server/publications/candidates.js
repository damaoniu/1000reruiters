Meteor.publishComposite('candidates',function(search,options){
    var currentUserId = this.userId;
    var that =this;
    var selector = {
        "roles.basic":'seeker'
    };
    console.log(search.positions);
    // search by skills the candidate have
    if(search.skills && search.skills.length>0){
        _.extend(selector,{
            "profile.skills":{$in:search.skills}
        });
    }

    //search by a city
    if(search.city){
        _.extend(selector,{
           "profile.city":search.city
        });
    }

    //search by a specific position
    if(search.positions&&search.positions.length>1){
        _.extend(selector,{
            "profile.positions":{$in:search.positions}
        });
    }
    if(search.recruiters&&search.recruiters.length>0){
        _.extend(selector,{
            "profile.recruiters":{$in:search.recruiters}
        })
    }
    //publish the counts first
    Counts.publish(that, 'candidatesCount', Meteor.users.find(selector,{noReady:true}));
    return {
        find:function(){
           return Meteor.users.find(selector,{fields:{roles:1,profile:1}});
        },
        children:[
            {
                collectionName:'candidatePositions',
                find:function(candidate){
                    Counts.publish(this,'candidatesPositionsCount',Positions.find());
                    return Positions.find();
                }
            }
        ]
    };

});

