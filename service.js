var app = angular.module('reddit');
app.service('FirebaseService', function($http, $q){
    this.getData = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'https://devmtn.firebaseio.com/posts.json'

        }).then(function(response){
            console.log(response);
            deferred.resolve(response);
        });
        return deferred.promise;
    };

    this.addPost = function(newPost){
        newPost.timestamp = Date.now();
        newPost.comments = [];
        newPost.karma = 0;
        newPost.id = guid();
        console.log(newPost.id);
        var dfd = $q.defer();
        $http({
            method: 'PUT',
            url: 'https://devmtn.firebaseio.com/posts/' + newPost.id + '.json',
            data: newPost
        })
          .then(function(newPost){

            dfd.resolve(newPost);
        });
        return dfd.promise;
    };


    var guid = function() {
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }



});