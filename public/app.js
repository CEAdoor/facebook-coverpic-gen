
(function(){
    var app=angular.module('jimp',[]);
    
    app.controller('homecontroller',['$scope','$http',function($scope,$http){
        $scope.message="Uploading ..."
        $scope.showImage=false;
        $scope.doneImage=false;
        $scope.displayImage=function(){
            $scope.showImage=true;  
        }
        $scope.startprocess=function(image){
            console.log(' image   '+image)
            var request={
                image:image,
            }
            $http.post('/api/image',request).then(function successCallback(response){
                console.log(response);
                $scope.message=response.data.msg;
                $http.post('/api/image/overlay',request).then(function successCallback(response){
                    $scope.message="Loading final images"

                    console.log(response.data);
                    $scope.images=response.data;
                    $scope.message="Loading final images please wait .This could take a moment"
            
                       
                            $scope.doneUpload=true;                            
                       
            
                },
                function errorCallback (response) {
                    console.log("bad day");
                });
                
            },
            function errorCallback (response) {
                console.log("bad day");
            }
        );
        }
    }])
}())