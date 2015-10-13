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
                    logicBoard = [];

                return {

                    /**
                     * Sets the size of the board for keeping track of data across cells
                     * 
                     * @param   {Number}        size        The size of the board
                     */
                    setBoardSize: function (size) {
                        var possibleCellStates = this.getPossibleCellStates();
                        for (var row = 0; row < size; row++) {
                            for (var cell = 0; cell < size; cell++) {
                                if (!logicBoard[row]) {
                                    logicBoard[row] = [];
                                }
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
                        return [
                            'off',
                            'oh',
                            'hi'
                        ];
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
                    }
                }
            }
        ]);
    }
);