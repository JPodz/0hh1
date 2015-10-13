require([
    'angular',
    'ui/package',
    'services/package'
], function (angular) {
    angular.module('application', [
        'game.ui',
        'game.services'
    ]);
    
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['application']);
    });
});