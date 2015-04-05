(function(window, angular) {
    'use strict';
    var pjToast = angular.module('pjToast.directives', ['pjToast.factories']);

    pjToast.directive('toast', ['ToastFactory', '$log', '$window', '$timeout',
        function(ToastFactory, $log, $window, $timeout) {
            return {
                restrict: 'EA',
                template:
                '<div id="pj-toast" >' +
                '<toast-message message="message"></toast-message>' +
                '</div>',
                compile : function(element, attrs){
                    return function(scope) {
                        var callback = function() {
                            scope.message = ToastFactory.getActiveMessage();
                        };
                        ToastFactory.registerCallback(callback);
                        scope.$on("$destroy", function(){
                            ToastFactory.unregisterCallback();
                        });
                        var center = function (element) {
                            element.css('position', 'absolute');
                            element.css("top", Math.max(0, $window.scrollY +  $window.innerHeight - (element[0].offsetHeight * 2) ) + "px");
                            element.css("left", Math.max(0, (($window.innerWidth - element[0].offsetWidth) / 2) + $window.scrollX) + "px");
                        };
                        scope.resize = function(){
                            $timeout(function(){ center(element); },0);
                        };
                        scope.resize();
                    };
                }
            };
        }
    ]);


    pjToast.directive('toastMessage', ['$timeout', '$compile', 'ToastFactory',
        function($timeout, $compile, ToastFactory) {
            return {
                restrict: 'EA',
                scope: {
                    message: '='
                },
                template:
                '<div class="alert alert-{{message.className}}">' +
                '<button type="button" class="close" ' +
                'ng-if="message.dismissButton" ' +
                'ng-bind-html="message.dismissButtonHtml" ' +
                'ng-click="!message.dismissOnClick && dismiss()"></button>' +
                '{{message.content}}' +
                '</div>',
                link: function(scope, element, attrs) {
                    scope.$watch('message', function(){
                        if (scope.message.dismissOnTimeout) {
                            $timeout(function() {
                                scope.message = ToastFactory.dismiss();
                            }, scope.message.timeout);
                        }
                        if (scope.message.dismissOnClick) {
                            element.bind('click', function() {
                                scope.message = ToastFactory.dismiss();
                            });
                        }
                    });

                }
            };
        }
    ]);


})(window, window.angular);
