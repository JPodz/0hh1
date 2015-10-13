define(
    [
        'ui/views'
    ],
    function (views) {
        var module = angular
            .module('game.ui', [])
            .run(['$templateCache', views.init]);
        return module;
    }
);