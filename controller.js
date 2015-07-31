var app = angular.module('reddit');
app.controller('PostsController', function($scope, FirebaseService){

$scope.getPosts = function(){
    FirebaseService.getData().then(function(response){
        $scope.posts = response.data;
    }, function(err){
        console.log(err);
    });


};
    $scope.getPosts();

    $scope.addPost = function() {
        FirebaseService.addPost($scope.newPost).then(function(res){
            $scope.getPosts();

        });

    }



});