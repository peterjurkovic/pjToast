(function(window, angular) {
    'use strict';

    angular.module('pjToast', [
            'ngSanitize',
            'pjToast.directives',
            'pjToast.factories'
        ]
    );

})(window, window.angular);