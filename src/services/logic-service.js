define(
    [
        'services/module'
    ],
    function (module) {
        return module.factory('logicService', [
            function defineLogicService() {

                var 
                    /**
                     * The map of the game board. This is used to keep track of states and other data of the cells so we
                     * can look up the status of a row, cell, or complete board. The board is made up of a series of
                     * rows. Each row consists of a series of cells. Each cell has data attributed to it, most notably
                     * its state.
                     * 
                     * @type {Array}
                     */
                    logicBoard = [],

                    /**
                     * Possible cell states
                     * 
                     * @type {String[]}
                     */
                    possibleCellStates = [
                        'off',
                        'oh',
                        'hi'
                    ],

                    /**
                     * Returns an array of all incomplete row indexes in the logic board
                     * 
                     * @return {Number[]}
                     */
                    getIncompleteRows = function () {
                        var incompleteRows = [];

                        // Loop over all rows in the logic board
                        for (var row = 0, length = logicBoard.length; row < length; row++) {

                            // Loop over all cells in the current iterated row
                            for (var cell = 0, length = logicBoard[row].length; cell < length; cell++) {

                                // If the cell state if 'off' and the row hasn't already been added as incomplete, add
                                // it to the list
                                if (logicBoard[row][cell].state === possibleCellStates[0] && incompleteRows.indexOf(row) === -1) {
                                    incompleteRows.push(row);
                                }
                            }
                        }
                        return incompleteRows;
                    };

                return {

                    /**
                     * Sets the size of the board for keeping track of data across cells
                     * 
                     * @param   {Number}        size        The size of the board
                     */
                    setBoardSize: function (size) {
                        for (var row = 0; row < size; row++) {
                            for (var cell = 0; cell < size; cell++) {
                                if (!logicBoard[row]) {
                                    logicBoard[row] = [];
                                }

                                // Set the default status to 'off'
                                logicBoard[row].push({
                                    state: possibleCellStates[0]
                                });
                            }
                        }
                    },

                    /**
                     * Returns the possible state values for a cell
                     * 
                     * @return {String[]}
                     */
                    getPossibleCellStates: function () {
                        return possibleCellStates;
                    },

                    /**
                     * Sets the state of the cell at the given row and index
                     * 
                     * @param   {String}        state       State
                     * @param   {Number}        row         Row
                     * @param   {Number}        index       Index
                     */
                    setCellState: function (state, row, index) {
                        logicBoard[row][index].state = state;
                    },

                    /**
                     * Returns the status of the board and any errors that are currently in display
                     *
                     * @return  {Object}
                     */
                    getGameStatus: function () {
                        return {
                            incompleteRows: getIncompleteRows()
                        }
                    }
                }
            }
        ]);
    }
);