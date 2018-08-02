if(Meteor.users.find().count()==0){
   var user= Accounts.createUser({
        username:'Joe',
        email:'joeflyingeagle@gmail.com',
        password:'ivmaoxue',
        profile:{
        }

    });
    Roles.addUsersToRoles(user,['admin'],'basic');
}