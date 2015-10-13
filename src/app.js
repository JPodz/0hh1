require([
    'angular',
    'ui/package',
    'services/package'
], function (angular) {
    angular.module('application', [
        'game.ui'
    ]);
    
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['application']);
    });
});