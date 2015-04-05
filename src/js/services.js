'use strict';

angular.module('pjToast.factories', [])
.factory('ToastFactory' , function($log, $rootScope) {

        var activeMessage = false,
            messageQueue = [],
            callBack = null;

        var defaults = {
            animation: 'fadeIn',
            className: 'success',
            dismissOnTimeout: true,
            timeout: 4000,
            dismissButton: true,
            dismissButtonHtml: '&times;',
            dismissOnClick: true,
            compileContent: false
        };

        var registerCallback = function(cb){
            if(angular.isFunction(cb)){
                callBack = cb;
                callBack();
            }else{
                $log.warn('Toast callback is not a function.');
            }
        }

        var unregisterCallback = function () {
            callBack = null;
        }

        var getActiveMessage = function () {
            return activeMessage;
        };

        var dismiss = function() {
            if(activeMessage){
                if(messageQueue.length){
                    activeMessage = messageQueue[0];
                    messageQueue.splice(0, 1);
                }else{
                    activeMessage = false;
                }
            }
            return activeMessage;
        };

        var create = function ( msg ){
            msg = (typeof msg === 'string') ? {content: msg} : msg;
            console.log(msg);
            var newMessage = new Message(msg);
            if(activeMessage){
                messageQueue.push(newMessage);
                $log.info('ToastFactory create: adding to a queue: ' + messageQueue.length);
            }else{
                $log.info('ToastFactory create: setting as an active');
                activeMessage = newMessage;
            }
            if(callBack){
                callBack();
            }
        };


        function Message(msg) {
            this.id = new Date().getTime();
            this.animation = defaults.animation;
            this.className = defaults.className;
            this.dismissOnTimeout = defaults.dismissOnTimeout;
            this.timeout = defaults.timeout;
            this.dismissButton = defaults.dismissButton;
            this.dismissButtonHtml = defaults.dismissButtonHtml;
            this.dismissOnClick = defaults.dismissOnClick;
            this.compileContent = defaults.compileContent;
            angular.extend(this, msg);
        }

    return {
        create : create,
        dismiss : dismiss,
        getActiveMessage : getActiveMessage,
        registerCallback : registerCallback,
        unregisterCallback : unregisterCallback
    };
});

