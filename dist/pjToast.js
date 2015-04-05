(function(window, angular) {
    'use strict';


    var pjToast = angular.module('pjToast.directives', ['pjToast.factories']);
    pjToast.directive('toast', ['ToastFactory', '$timeout', '$templateCache', '$log',
        function(ToastFactory,$timeout, $templateCache, $log) {
            return {
                restrict: 'EA',
                scope : {},
                template:
                '<div id="pj-toast">' +
                ' <div class="alert alert-{{message.className}}" ' +
                ' ng-class="{\'alert-dismissible\': message.dismissButton}">' +
                ' <button type="button" class="close" ' +
                ' ng-if="message.dismissButton" ' +
                ' ng-bind-html="message.dismissButtonHtml" ' +
                ' ng-click="!message.dismissOnClick && dismiss()">aa' +
                ' {{message.content}}' +
                ' </div>'+
                '</div>',

                link: function(scope, element, attrs) {
                    $log.info('toast link');
                    scope.animation = ToastFactory.getSettings().animation;
                    scope.message = ToastFactory.getActiveMessage();
                    $log.info('toast : ' + scope.message);
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
                    scope.dismiss = function() {
                        ToastFactory.dismiss();
                    };

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

(function(window, angular) {
    'use strict';

    angular.module('pjToast', [
            'ngSanitize',
            'pjToast.directives',
            'pjToast.factories'
        ]
    );

})(window, window.angular);