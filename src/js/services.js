'use strict';

    angular.module('pjToast.factories', [])
    .factory('Toast' , ['$log', function($log) {

        var activeMessage = false,
            messageQueue = [],
            callBack = null,
            defaults = {
                wrappClassName : 'pj-toast',
                msgClassName: '',
                dismissOnTimeout: true,
                timeout: 4000,
                dismissButton: true,
                dismissButtonHtml: '&times;',
                dismissOnClick: true,
                centerOnScroll : true,
                withIcon : true
            };

        // Public ---------------------------------------

        var registerCallback = function(cb){
                if(angular.isFunction(cb)){
                    callBack = cb;
                    callBack();
                }else{
                    $log.warn('Toast callback is not a function.');
                }
            },

            unregisterCallback = function () {
                callBack = null;
            },

            getActiveMessage = function () {
                return activeMessage;
            },

            dismiss = function() {
                if(activeMessage){
                    if(messageQueue.length){
                        activeMessage = messageQueue[0];
                        messageQueue.splice(0, 1);
                    }else{
                        activeMessage = false;
                    }
                }
                return activeMessage;
            },

            success = function ( message ){
                create( message, 'success');
            },

            info = function ( message ){
                create( message, 'info');
            },

            warning = function ( message ){
                create( message, 'warning');
            },

            danger = function ( message ){
                create( message, 'danger');
            },

            config = function(config) {
                if(config){
                    angular.extend(defaults, config);
                }else{
                    return defaults;
                }
            };
        // Private ---------------------------------------

        function create( message, className  ){
            if(typeof message === 'string'){
                message = {
                    content: message,
                    msgClassName : className
                };
            }else if(!angular.isDefined(message.msgClassName)){
                message.msgClassName = className;
            }
            var newMessage = new Message(message);
            if(activeMessage){
                messageQueue.push(newMessage);
            }else{
                activeMessage = newMessage;
            }
            if(callBack){
                callBack();
            }
        }


        function Message(msg) {
            this.msgClassName = defaults.msgClassName;
            this.dismissOnTimeout = defaults.dismissOnTimeout;
            this.timeout = defaults.timeout;
            this.dismissButton = defaults.dismissButton;
            this.dismissButtonHtml = defaults.dismissButtonHtml;
            this.dismissOnClick = defaults.dismissOnClick;
            this.withIcon = defaults.withIcon;
            this.icoClass = function () {
                switch (this.msgClassName){
                    case 'success' : return 'ok';
                    case 'info' : return 'info-sign';
                    case 'warning' : return 'alert';
                    case 'danger' : return 'remove';
                }
                return '';
            };
            angular.extend(this, msg);
        }

        return {
            success : success,
            info : info,
            warning : warning,
            danger : danger,
            dismiss : dismiss,
            config : config,
            getActiveMessage : getActiveMessage,
            registerCallback : registerCallback,
            unregisterCallback : unregisterCallback
        };
    }]);