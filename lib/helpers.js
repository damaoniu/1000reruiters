 dataURItoBlob=function(dataURI) {
    'use strict'
    var byteString,
        mimestring

    if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
        byteString = atob(dataURI.split(',')[1])
    } else {
        byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], {type: mimestring});
}

 fileExtension=function(fileName){
    return fileName.substr(fileName.lastIndexOf('.') + 1);
}

 //to make interitence in javascript
 inherits = function(ctor, superCtor) {
     ctor.super_ = superCtor;
     ctor.prototype = Object.create(superCtor.prototype, {
         constructor: {
             value: ctor,
             enumerable: false,
             writable: true,
             configurable: true
         }
     });
 };

 /*
 * @purpse to delete an objets attached images and docs
 * @param collection object
 * */
 function prepareSelector(object) {
     var selector = null;
     if (_.isArray(object)) {
         selector = object;
     } else {
         selector = _.flatten( _.values(object));
     }
     return selector;
 }

 // use this when destroy an object only functionaly in the server side
 deleteAttachments = function(object){

     if(_.has(object,'docs')){
         var selector =  prepareSelector(object.docs);
         Docs.remove({
             _id:{$in: selector}
         })
     }
     if(_.has(object,'images')){
         var selector = prepareSelector(object.images);
         console.log(selector);
         Images.remove({
             _id:{$in:selector}
         })
     }
     console.log(object)
     //recursive if the object has profile, like the user object
     if(_.has(object,'profile')){
         deleteAttachments(object.profile);
     }

 }
 function currentUserId(){
     return Meteor.userId();
 }
