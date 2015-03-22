(function(window, angular) {
    'use strict';

    var pjToast = angular.module('pjToast.directives', ['pjToast']);
    pjToast.directive('toast', ['pjToastConfig', function(pjToastConfig){
       return{
           replace: true,
           restrict: 'EA',
           link : function(scope, element, attrs){
               console.log(pjToastConfig);
           }
       }
    }]);

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
