/**
 * Created by peto on 22.3.2015.
 */
'user strict';


var app = angular.module('ToastApp', ['pjToast']);


app.controller('ToastController', function(Toast, $scope){
    var that = this;
    that.head = 'pjToast test controller';


    Toast.info('from controller ' + new Date());


    $scope.show = function(){
        Toast.danger('test ' + new Date());
    };
});




