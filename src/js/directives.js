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
                 link : function(scope, element, attrs){
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
                '<div class="alert alert-{{message.msgClassName}}">' +
                '{{message.content}}' +
                '<button type="button" class="close" ' +
                'ng-if="message.dismissButton" ' +
                'ng-bind-html="message.dismissButtonHtml" ' +
                'ng-click="!message.dismissOnClick && dismiss()"></button>' +
                '</div>',
                link: function(scope, element, attrs) {
                    scope.$watch('message', function(){
                        if (scope.message.dismissOnTimeout) {
                            $timeout(function() {
                                scope.message = Toast.dismiss();
                            }, scope.message.timeout);
                        }
                        if (scope.message.dismissOnClick) {
                            element.bind('click', function() {
                                scope.message = Toast.dismiss();
                            });
                        }
                    });
                    scope.dismiss = function() {
                        Toast.dismiss();
                    };

                }
            };
        }
    ]);

