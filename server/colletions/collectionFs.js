var imageStoreNormal = new FS.Store.S3('imageStoreNormal',{
    accessKeyId:Meteor.settings.AWS.accessKeyId,
    secretAccessKey:Meteor.settings.AWS.secretKeyId,
    bucket:'1000hunters'
    //,
    //fileKeyMaker: function (fileObj) {
    //    // Lookup the copy
    //    var store = fileObj && fileObj._getInfo(name);
    //    // If the store and key is found return the key
    //    if (store && store.key) return store.key;
    //
    //    // TO CUSTOMIZE, REPLACE CODE AFTER THIS POINT
    //
    //    var filename = fileObj.name();
    //    var filenameInStore = fileObj.name({store: name});
    //
    //    // If no store key found we resolve / generate a key
    //    return fileObj.collectionName + '/' + fileObj._id + '-' + (filenameInStore || filename);
    //}
});
var imageStoreThumb = new FS.Store.S3('imageStoreThumb',{
        accessKeyId:Meteor.settings.AWS.accessKeyId,
        secretAccessKey:Meteor.settings.AWS.secretKeyId,
        bucket:'1000hunters',
        transformWrite: function(fileObj, readStream, writeStream) {
            gm(readStream, fileObj.name()).resize('40', '40').stream().pipe(writeStream)
            console.log('transforming');
        }
        //,
        //fileKeyMaker: function (fileObj) {
        //    // Lookup the copy
        //    var store = fileObj && fileObj._getInfo(name);
        //    // If the store and key is found return the key
        //    if (store && store.key) return store.key;
        //
        //    // TO CUSTOMIZE, REPLACE CODE AFTER THIS POINT
        //
        //    var filename = fileObj.name();
        //    var filenameInStore = fileObj.name({store: name});
        //
        //    // If no store key found we resolve / generate a key
        //    return fileObj.collectionName + '/' + fileObj._id + '-' + (filenameInStore || filename);
        //}
    }
);

Images = new FS.Collection('images',{
    stores:[imageStoreNormal,imageStoreThumb],
    filter:{
        allow:{
            contentTypes:['image/*']
        }
    }
});
var filesStore = new FS.Store.S3('filesStore',{
    accessKeyId:Meteor.settings.AWS.accessKeyId,
    secretAccessKey:Meteor.settings.AWS.secretKeyId,
    bucket:'1000hunters'
});
Files = new FS.Collection('files',{
    stores:[filesStore],
    filter:{
        allow:{
            contentType:['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        }
    }
})
