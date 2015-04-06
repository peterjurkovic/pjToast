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

