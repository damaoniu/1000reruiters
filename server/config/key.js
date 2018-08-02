Keys = {
    stripe_key:"pk_test_q77EeIZ9gTdFBHeoCKdyI6WO",
    stripe_secret:"sk_test_vT5H2MH3rvLF1dCtYwH1pPef"
}
S3.config = {
    key: Meteor.settings.AWS.accessKeyId,
    secret: Meteor.settings.AWS.secretKeyId,
    bucket: '1000hunters',
    uploadAuthorize:function(){
        if(Meteor.userId() ==null){
            return false;
        }else{
            //must always return true
            return true;
        }
    },
    deleteAuthorize:function(path){
        if(Meteor.userId() ==null){
            return false;
        }else{
            return true;
        }
    }
};