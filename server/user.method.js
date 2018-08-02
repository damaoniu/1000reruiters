Meteor.methods({

   sendResetEmail:function(email){
       console.log('sending reset email to '+email);
       check(email,String);

       var user =Accounts.findUserByEmail(email);
       if(user){
           Accounts.sendResetPasswordEmail(user._id);
           return true;
       }else{
           return false;
       }
   },
    // create the user
    newUser:function(user){
        var newId = Accounts.createUser(user);
        if(newId){
            if(user.profile.seeker){
                Roles.addUsersToRoles(newId,['seeker'],'basic');
                console.log('seeker sign up');
            }else{
                Roles.addUsersToRoles(newId,['recruiter'],'basic');
            }

            //send the emails
            if(!Roles.userIsInRole(currentUserId,['admin'],'mpotravel')){throw  new Error('no right to add user');}
            //create a new user
            var newUserId = Accounts.createUser(user);
            Roles.addUsersToRoles(newUserId,[role],'mpotravel');
            this.unblock();
            var newUser= Meteor.users.findOne(newUserId);
            /*send and email for notificiation using mandrill*/
            sendEmail.mandrill('registrationNotification',[],{
                subject:'Welcome',
                to:[{email:newUser.emails[0].address}]
            });
            //sendEmail.mailgun('test',{test:'test'},{
            //    to:'wanjiangmaoniu@gmail.com'
            //});
            return Meteor.users.findOne(newUserId);

        }

        return false;
    },
    saveUser:function(user,edit,role){
        //this is used to eliminate the $$hashkeys added by angular in the frontend with ng-repeat directive
        //must use angular.toJson on the object in the frontend at the same time
        user = JSON.parse(user);
        var currentUser =Meteor.user();
        var currentUserId = currentUser._id;
        if(!Roles.userIsInRole(currentUserId,['admin'],'basic')  && currentUserId!=user._id){
            throw new Error('sorry no right to edit');
        }
        //if user has _id, that means this is to edit
        if(Meteor.userId()===user._id) {
            //prevent user from change it's own role
            //console.log(user);
        };
        user.profile.updatedAt= new Date();
        // update the user reccord
        Meteor.users.update(user._id,{$set:{
            profile:user.profile
        }});
    }
});