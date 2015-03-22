/**
 * Created by peto on 22.3.2015.
 */
'user strict';


var app = angular.module('ToastApp', ['pjToast']);


app.controller('ToastController', [function(){
    var that = this;
    that.head = 'pjToast test controller';
}]);




