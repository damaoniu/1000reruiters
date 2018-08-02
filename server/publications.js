Meteor.publish('images', function() {
    console.log('publishing images');
    return Images.find({
        //'metedata.owner':Meteor.userId()
    });
});
