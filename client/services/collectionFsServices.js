angular.module('hunters')
    .service('collectionFsService',[function(){
        return{
            getImageUrl:function(id,store){
                var file = Images.findOne(id);
                if(file){
                    var url;
                    if(store){
                        url= file.url({store:store});
                    }else{
                        url= file.url();
                    }
                    if(url){
                        return url;

                    }else{
                        return "//:0";
                    }
                }else{
                    return "//:0";
                }

            },
            getDocUrl:function(id,store){
                if(id){
                    var file = Docs.findOne(id);
                    if(file){
                        return file.url();
                    }else{
                        return "";
                    }

                }else{
                    return "";
                }
            }
        };
    }]);