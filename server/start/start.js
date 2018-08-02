if(Meteor.settings.AWS){
    //S3.config={
    //    key:Meteor.settings.AWS.accessKeyId,
    //    secret:Meteor.settings.AWS.secretKeyId,
    //    bucket:"1000hunters",
    //    denyDelete:true
    //};
}else{
    console.warn("AWS keys missing");
}