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
                     * @private
                     * @type {Array}
                     */
                    logicBoard = [],

                    /**
                     * Possible cell states
                     *
                     * @private
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
                     * @private
                     * @return {Number[]}
                     */
                    getIncompleteRows = function () {
                        var incompleteRows = [];

                        iterateOverBoard(function (cell, rowIndex, cellIndex) {

                            // If the cell state if 'off' and the row hasn't already been added as incomplete, add
                            // it to the list
                            if (logicBoard[rowIndex][cellIndex].state === possibleCellStates[0]) {
                                if (incompleteRows.indexOf(rowIndex) === -1) {
                                    incompleteRows.push(rowIndex);
                                }
                            }
                        });
                        return incompleteRows;
                    },

                    /**
                     * Returns an array of all row indexes that contain an invalid number of equal blocks
                     *
                     * @private
                     * @return {Number[]}
                     */
                    getInvalidMatchingRows = function () {
                        var invalidRows = [],
                            rowColors = {};

                        // Loop over all rows in the logic board
                        iterateOverAllRows(function (rowIndex) {

                            // Reset the row color counts
                            for (var key in rowColors) {
                                if (rowColors.hasOwnProperty(key)) {
                                    rowColors[key] = 0;
                                }
                            }

                            // Loop over all cells in the current iterated row and get a count of each of their states
                            iterateOverAllCellsInRow(rowIndex, function (cell, cellIndex) {
                                var state = logicBoard[rowIndex][cellIndex].state;
                                if (!rowColors[state]) {
                                    rowColors[state] = 0;
                                }
                                rowColors[state]++;
                            });

                            // Loop over the row color counts again. If each of their numbers match, then it is assumed
                            // that they have at least the correct number of colors in each row. Note, we don't care
                            // about empty cells in this case, because they'd get picked up by the invalid number of
                            // selected cells error.
                            var previousValue = undefined;
                            for (var key in rowColors) {
                                if (rowColors.hasOwnProperty(key)) {
                                    if (previousValue && rowColors[key] !== previousValue) {
                                        if (invalidRows.indexOf(rowIndex) === -1) {
                                            invalidRows.push(rowIndex);
                                        }
                                    }
                                    previousValue = rowColors[key];
                                }
                            }
                        });
                        return invalidRows;
                    },

                    /**
                     * Iterates over the entire board and calls the callback method with the iterative data
                     *
                     * @private
                     * @param   {Function}      callback        Callback method
                     */
                    iterateOverBoard = function (callback) {
                        if (typeof callback !== 'function') {
                            return;
                        }
                        iterateOverAllRows(function (rowIndex) {
                            iterateOverAllCellsInRow(rowIndex, function (cell, cellIndex) {
                                callback(logicBoard[rowIndex][cellIndex], rowIndex, cellIndex);
                            });
                        });
                    },

                    /**
                     * Iterates over all rows in a board
                     *
                     * @private
                     * @param   {Function}      callback        Callback method
                     */
                    iterateOverAllRows = function (callback) {
                        if (typeof callback !== 'function') {
                            return;
                        }
                        for (var rowIndex = 0, length = logicBoard.length; rowIndex < length; rowIndex++) {
                            callback(rowIndex);
                        }
                    },

                    /**
                     * Iterates over all cells in the provided row index
                     *
                     * @private
                     * @param   {Number}        rowIndex        Row index to iterate over
                     * @param   {Function}      callback        Callback method
                     */
                    iterateOverAllCellsInRow = function (rowIndex, callback) {
                        if (typeof callback !== 'function') {
                            return;
                        }
                        for (var cellIndex = 0, length = logicBoard[rowIndex].length; cellIndex < length; cellIndex++) {
                            callback(cell, cellIndex);
                        }
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
                            incompleteRows: getIncompleteRows(),
                            invalidMatchingRows: getInvalidMatchingRows()
                        }
                    }
                }
            }
        ]);
    }
);