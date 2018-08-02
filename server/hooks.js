/*
*
* prevent low level users to create user
*
*/
Accounts.onCreateUser(function(options, user) {
    //if(!Roles.userIsInRole(currentUser._id,['admin','partner'],'mpotravel')){
    //    throw new Error("no right to create user");
    //}
    //var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
    //user.dexterity = d6() + d6() + d6();
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    return user;
});