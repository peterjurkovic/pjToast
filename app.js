/**
 * Created by peto on 22.3.2015.
 */
'user strict';


var app = angular.module('ToastApp', ['pjToast']);


app.controller('ToastController', function(Toast, $scope){
    var that = this;
    that.head = 'pjToast test controller';




    $scope.infoToast = function(){
        Toast.info({
            content : 'This is info Toast message!',
            withIcon : false
        });
    };

    $scope.successToast = function(){
        Toast.success('This is success Toast message!');
    };

    $scope.warningToast = function(){
        Toast.warning('This is warning Toast message!');
    };

    $scope.dangerToast = function(){
        Toast.danger('This is danger Toast message!');
    };
});




