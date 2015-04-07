'use strict';

   angular.module('pjToast.directives', ['pjToast.factories'])
    .directive('toast', ['Toast', '$log', '$window', '$timeout',
        function(Toast, $log, $window, $timeout) {
            return {
                restrict: 'EA',
                replace : true,
                template:
                '<div class="{{config.wrappClassName}}" ng-show="message" >' +
                '<toast-message message="message"></toast-message>' +
                '</div>',
                 link : function(scope, element){
                    scope.config = Toast.config();
                    var center = function (element) {
                        element
                        .css('z-index', '999')
                        .css('position', 'absolute')
                        .css("top", calculateTopPos() + "px")
                        .css("left", calculateLeftPos() + "px");

                        function calculateTopPos(){
                            return Math.max(0, $window.scrollY +  $window.innerHeight - element[0].offsetHeight * 2 );
                        }

                        function calculateLeftPos(){
                            return Math.max(0, (($window.innerWidth - element[0].offsetWidth) / 2) + $window.scrollX);
                        }
                    };

                    scope.resize = function(){
                        $timeout(function(){ center(element); },0);
                    };
                    scope.resize();

                    var callback = function() {
                        scope.message = Toast.getActiveMessage();
                        scope.resize();
                    };

                    Toast.registerCallback(callback);

                    scope.$on("$destroy", function(){
                        Toast.unregisterCallback();
                    });
                    if(scope.config.centerOnScroll){
                        angular.element($window).bind("scroll", function() {
                            if(scope.message){
                                scope.resize();
                            }
                        });
                    }
                }
            };
        }
    ])
    .directive('toastMessage', ['$timeout', 'Toast',
        function($timeout, Toast) {
            return {
                restrict: 'EA',
                scope: {
                    message: '='
                },
                template:
                '<div ng-click="dismiss()" class="alert alert-{{message.msgClassName}}">' +
                '<span ng-if="message.withIcon" class="glyphicon glyphicon-{{message.icoClass()}}"></span>' +
                '{{message.content}}' +
                '<button type="button" class="close" ' +
                'ng-if="message.dismissOnClick" ' +
                'ng-bind-html="message.dismissButtonHtml"></button>' +
                '</div>',
                link: function(scope) {
                    var promise = false;
                    scope.$watch('message', function(){
                        if (scope.message.dismissOnTimeout) {
                           promise = $timeout(function() {
                                scope.message = Toast.dismiss();
                            }, scope.message.timeout);
                        }
                    });
                    scope.dismiss = function () {
                        if (scope.message && scope.message.dismissOnClick) {
                            if(promise){
                                $timeout.cancel(promise);
                            }
                            scope.message = Toast.dismiss();
                        }
                    };


                }
            };
        }
    ]);


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
'use strict';

angular.module('pjToast', [
        'ngSanitize',
        'pjToast.directives',
        'pjToast.factories'
    ]
);
