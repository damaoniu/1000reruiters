var imageStoreNormal = new FS.Store.S3('imageStoreNormal');
var imageStoreThumb = new FS.Store.S3('imageStoreThumb');

Images = new FS.Collection('images',{
   stores:[imageStoreNormal,imageStoreThumb],
    filter:{
        allow:{
            contentTypes:['image/*']
        }
    }
});

var fileStore = new FS.Store.S3('filesStore');
Files = new FS.Collection('files',{
    stores:[fileStore],
    filter:{
        allow:{
            contentType:['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        }
    }
});
