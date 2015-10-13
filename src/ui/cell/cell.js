define(
    [
        'ui/module'
    ],
    function (module) {
        module.controller('CellController', [
            '$scope',
            function defineCellController($scope) {

                var 
                    /**
                     * The list of possible states that a cell may be
                     *
                     * @private
                     * @type    {Array}
                     */
                    possibleStates = [
                        'off',
                        'oh',
                        'hi'
                    ],

                    /**
                     * Returns whether or not the provided state is valid
                     *
                     * @private
                     * @param   {String}        state       Test state
                     * @return  {Boolean}
                     */
                    isValidState = function (state) {
                        if (!state) {
                            return false;
                        }
                        return possibleStates.indexOf(state) >= 0;
                    };

                /**
                 * The current state of the cell
                 * 
                 * @type {String}
                 */
                $scope.state = isValidState($scope.state) ? $scope.state : possibleStates[0];

                /**
                 * Cycles to the next iteration in the possible states
                 */
                $scope.changeState = function () {
                    var currentIndex = possibleStates.indexOf($scope.state),
                        nextIndex = (currentIndex === possibleStates.length - 1) ? 0 : currentIndex + 1;
                    $scope.state = possibleStates[nextIndex];
                    console.log($scope.state);
                }
            }
        ]);
        return module.directive('hiCell', [
            function defineCell() {
                return {
                    restrict: 'AE',
                    templateUrl: 'ui/cell/cell.html',
                    controller: 'CellController',
                    scope: {
                        state: "=?"
                    }
                }
            }
        ]);
    }
);