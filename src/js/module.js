(function(window, angular) {
    'use strict';

    angular.module('pjToast',
        ['pjToast.directives']
    )
    .constant('pjToastConfig', {
        containerId: 'pj-toast',
        tapToDismiss: true,
        targetSelector: 'body',
        timeOut: 4000,
        toastClass: 'pj-toast'
    });

})(window, window.angular);