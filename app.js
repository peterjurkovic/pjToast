/**
 * Created by peto on 22.3.2015.
 */
'user strict';


var app = angular.module('ToastApp', ['pjToast']);


app.controller('ToastController', function(ToastFactory, $scope){
    var that = this;
    that.head = 'pjToast test controller';


    ToastFactory.create('from controller ' + new Date());


    $scope.show = function(){
        ToastFactory.create('test ' + new Date());
    };
});




