define(
    [
        'ui/module'
    ],
    function (module) {
        module.controller('BoardController', [
            '$scope',
            function defineBoardController($scope) {

                /**
                 * Size of the board. Defaults to 4x4.
                 * 
                 * @type    {Number}
                 */
                $scope.size = (isNaN($scope.size)) ? 4 : parseInt($scope.size, 10);
                
                /**
                 * AngularJS currently can only iterate over a collection, so we'll fake that here with a method that
                 * returns a list with the provided number of iterations as its max size.
                 * 
                 * @param   {Number}        number          Size to make the collection
                 * @return  {Array}
                 */
                $scope.getCollectionOfSize = function (number) {
                    return new Array(number);
                }
            }
        ]);
        return module.directive('hiBoard', [
            function defineBoard() {
                return {
                    restrict: 'AE',
                    templateUrl: 'ui/board/board.html',
                    controller: 'BoardController',
                    scope: {
                        size: "=?"
                    }
                }
            }
        ]);
    }
);