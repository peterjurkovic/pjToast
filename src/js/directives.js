(function(window, angular) {
    'use strict';


    var pjToast = angular.module('pjToast.directives', ['pjToast.factories']);
    pjToast.directive('toast', ['ToastFactory', '$log',
        function(ToastFactory, $log) {
            return {
                restrict: 'EA',
                template:
                '<div id="pj-toast" >' +
                '<toast-message message="message"></toast-message>' +
                '</div>',
                compile : function(element, attrs){



                    return function(scope) {
                        $log.info('toast link');
                        var callback = function() {
                            scope.message = ToastFactory.getActiveMessage();
                        };
                        ToastFactory.registerCallback(callback);
                        scope.$on("$destroy", function(){
                            ToastFactory.unregisterCallback();
                        });

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


    /*
    *
     jQuery.fn[ "outer" + name ] = function( margin ) {
     var elem = this[0];
     return elem ?
     elem.style ?
     parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
     this[ type ]() :
     null;
     };
    *
    * */

})(window, window.angular);
