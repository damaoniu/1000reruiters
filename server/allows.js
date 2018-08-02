var allowGeneral = {
    insert: function (userId, doc) {
        console.log('adding a new image');
        return (userId ? true : false);
    },
    remove: function (userId, doc) {
        console.log('removing'+doc._id);
        return true;
    },
    download: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return (userId ? true : false);
    }
 };
Images.allow(allowGeneral);
Positions.allow(allowGeneral);