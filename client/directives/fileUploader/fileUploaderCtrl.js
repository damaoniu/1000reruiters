/*
*@depend on the latest version of the ngimgcrop v0.3.2
*
* */
angular.module('hunters').controller("FileUploaderCtrl",[
    "$scope","$element","$meteor",'$filter',"$rootScope","$timeout",
    function ($scope,$element,$meteor,$filter,$rootScope,$timeout) {
    //initiate the model or the image if not yet
        var vm = $scope;
    vm.model=vm.model ||[];
    //vm.images = vm.$meteorCollectionFS(Images, false, Images);
    vm.items = [];

    //vm.object = $meteor.object(window[vm.subscribe],vm.model._id);
    vm.imgSrc='';
    vm.myCroppedImage='';
    vm.newItems=[];
    vm.true =true;
    vm.false =false;
    vm.isImage =isImage;
    vm.newImages ={};
    vm.closeModal =closeModal;


    function isImage (item){
            return _.indexOf(['jpg','png','gif','jpeg'],fileExtension(item.name))>-1;
    }
    function saveModelOnParent() {
        if (vm.onSave) {
            $timeout(function () {
                vm.onSave({stay: true});
            }, 0);
        }
    }
    //use a popup to add items
    vm.openAsModal=function(){
        //needed to be append to the body first and then do the modal otherwise the layout won't work
        var container = $element.find('.pop-container');
        //put it back to its container when the modal is hidden
        vm.modal = $element.find('.pop-modal');
        vm.modal.on('hidden.bs.modal',function(){
            vm.modal.appendTo(container);
        });
        vm.modal.appendTo('body').modal('show');
    }

    //preprocess the items
    vm.addImages = function (files) {
            if (files.length > 0) {
                //if we are doing multiple uploading
                if (vm.crop) {
                    vm.newItems.push(files[0]);
                    if(vm.isImage(files[0])) {
                        var reader = new FileReader();
                        reader.fileName = files[0].name;
                        reader.onload = function (e) {
                            vm.$apply(function (vm) {
                                vm.imgSrc = e.target.result;
                                vm.myCroppedImage = '';
                            });
                        };
                        reader.readAsDataURL(files[0])
                    }
                } else {
                    angular.forEach(files,function (file) {
                        vm.newItems.push(file);
                        if(vm.isImage(file)) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                vm.$apply(function (vm) {
                                    vm.newImages[file.name] = e.target.result;
                                    console.log(vm.newItems);
                                });
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }

            }else {
                vm.imgSrc = undefined;
            }


    };
    //save the image when adding a single file
    vm.saveSingleImage=function(){
        saveImage();
        closeModal();
        console.log('saving');
        if(vm.onSave){
            $timeout(function(){
                vm.onSave({stay:true});
            },0);
        }

    };
    //cancel the image when adding a single file
    vm.cancel = function(){
        vm.imgSrc="";
    };
    //    save while add many
    vm.save=function(img){
        saveImage(img);
        if(vm.onSave){
            $timeout(function(){
                vm.onSave({stay:true});
            },0);
        }
    };
    // remove one image while adding many
    vm.remove=function(item){
        vm.newItems=_.without(vm.newItems,item);
    };
    vm.saveAll=function(){
        angular.forEach(vm.newItems,function(file){
            Images.insert(file,function(err,result){
                result.update({$set:{'metadata.owner':vm.currentUser._id}});
                vm.model.push(result._id);
                vm.newImages = _.without(vm.newImages,image);
                //update and save on parent controller
                saveModelOnParent();
            });
        });
        closeModal();
    };
    vm.removeAll=function(){
        vm.newItems=[];
    };
    //need manually update the croppedImage when changed
    vm.saveCropped=function(data){
        vm.myCroppedImage=data;
    }
    function closeModal(){
        if(vm.pop){
            vm.modal.modal('hide');
        }
    }
    function saveImage(item) {
        item=item||vm.myCroppedImage || vm.imgSrc;
        item.uploading =true;
        if(_.isString(item)){
            item = S3.b64toBlob(item);
        }

        var extension =item.name? fileExtension(item.name):'jpg'
        //var holder =[];
        //Images.insert(item, function (err, result) {
        //    // the result is an FS.FIle object can be used to do all kinds of manipulation
        //    result.update({$set:{'metadata.owner':$rootScope.currentUser._id}});
        //    if(item.name)result.name(item.name);
        //    item.progress = result.uploadProgress();
        //    if (vm.replace) {
        //        //if only one photo is needed replace the current one
        //        //remove the old one first
        //        if (vm.model.length > 0) {
        //            Images.remove(vm.model[0],function(err,result){
        //
        //            });
        //        }
        //        vm.model[0] = result._id;
        //    } else {
        //        vm.model.push(result._id);
        //    }
        //    //holder.push(result._id);
        //    item.uploading =false;
        //    item.uploaded = true;
        //    vm.closeModal();
        //    if(!vm.isMul){
        //        vm.imgSrc = undefined;
        //        vm.myCroppedImage = '';
        //        vm.showPlain = false;
        //    }
        //    saveModelOnParent();
        //
        //});



        //the lepozepo/s3 solution and this sames to be a better solution
        S3.upload({
            files:[item],
            path:extension
        },function(err,result){
            if(!err){
                var data = {
                    url: result.url,
                    relative_url: result.relative_url,
                    name:item.name,
                    size:item.size,
                    type:extension
                };
                if(vm.replace&&vm.model.length>0){

                    S3.delete(vm.model[0].relative_url,function(err,result){});
                    vm.model[0]=data;
                }else{
                    vm.model.push(data);
                }
                item.uploading =false;
                item.uploaded = true;
                vm.closeModal();
                if(!vm.isMul){
                    vm.imgSrc = undefined;
                    vm.myCroppedImage = '';
                    vm.showPlain = false;
                }
                saveModelOnParent();
            }

        });
    }
    $scope.$on('$destroy',function(){
       jQuery(window).off('hidden.bs.modal');
    });
}]);